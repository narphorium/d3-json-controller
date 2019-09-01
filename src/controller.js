import { JSONPath } from 'jsonpath-plus'

import { JSONControllerCaption } from './caption'
import { JSONControllerControls } from './controls'
import { JSONControllerHighlight } from './highlight'
import { JSONControllerHint } from './hint'
import { selectHierarchy } from './selection'

/** The JSONController class defines a data model which can be indexed into
  * using JSON paths.
  *
  * The controller maintains a current path which indicates the slice of data
  * which is currently being displayed. There are various methods for updating
  * the current path.
  *
  * UI widgets register themselves as listeners for a given subpath within the
  * dataset and anytime the path is changed, they get an update with a slice
  * of the data at their registered subpath.
  */
class JSONController {
  constructor (data, config) {
    this._data = data

    this._config = config
    if (this._config === undefined) this._config = {}
    this.transitionDuration = 400

    this._listeners = []
    this._listener_paths = []

    this._current_path = []
    this._current_length = []
    this.updateLengths()
  }

  registerListener (listener, path) {
    this._listeners.push(listener)
    this._listener_paths.push(path)
  }

  updateListeners (duration) {
    if (duration === undefined) duration = this.transitionDuration
    for (var i = 0; i < this._listeners.length; i++) {
      this._listeners[i](
        this.getPath(this._listener_paths[i]),
        duration,
        this.getCurrentMatchingPath(this._listener_paths[i]))
    }
  }

  updateLengths () {
    var d = this._data
    for (var i = 0; i < this._current_path.length; i++) {
      this._current_length[i] = d.length
      if (this._current_path[i] === -1) {
        d = []
      } else {
        d = d[this._current_path[i]]
      }
    }
  }

  validateIndex (index) {
    // TODO: Validate that level exists
    var d = this._data
    for (var i = 0; i < index.length; i++) {
      if (!(d instanceof Object)) return false
      if (typeof (index[i]) === 'string' && (d[index[i]] === 'undefined')) return false
      if (typeof (index[i]) === 'number' && (index[i] < 0 || index[i] >= d.length)) return false
      d = d[index[i]]
    }
    return true
  }

  moveIndexInBounds (index) {
    console.log('moveIndexInBounds: ' + index)
    var newIndex = index.slice(0)
    var d = this._data
    for (var i = 0; i < index.length; i++) {
      if (typeof (index[i]) === 'number') {
        if (!newIndex[i] || newIndex[i] < 0) {
          newIndex[i] = 0
        } else if (newIndex[i] >= d.length) {
          newIndex[i] = d.length - 1
        }
      }
      d = d[newIndex[i]]
    }
    return newIndex
  }

  goto (level, step) {
    var newIndex = this._current_path.slice()
    newIndex[level] = step
    if (this.validateIndex(newIndex)) {
      this._current_path = newIndex
      this.updateLengths()
      this.updateListeners()
    } else {
      newIndex = this.moveIndexInBounds(newIndex)
      if (this.validateIndex(newIndex)) {
        this._current_path = newIndex
        this.updateLengths()
        this.updateListeners()
      } else {
        console.log('Cannot set goto index' + step + ' at level ' + level + 'in data with ' + this._current_path.length + ' levels')
      }
    }
  }

  gotoLevel (level) {
    var newIndex = this._current_path.slice(0, Math.max(0, level + 1))
    if (this.validateIndex(newIndex)) {
      this._current_path = newIndex
      this.updateLengths()
      this.updateListeners()
    }
  }

  gotoPath (path) {
    if (this.validateIndex(path)) {
      this._current_path = path
      this.updateLengths()
      this.updateListeners()
    } else {
      console.log(path)
      console.error('Invalid path: ' + path)
    }
  }

  data (sliceName) {
    var d = this.get(this._current_path)
    if (sliceName) {
      return d[sliceName]
    }
    return d
  }

  get (index) {
    var d = this._data
    if (this.validateIndex(index)) {
      for (var i = 0; i < index.length; i++) {
        if (index[i] === -1) break
        d = d[index[i]]
      }
    }
    return d
  }

  matchCurrentPath (query) {
    if (query === '$') {
      return [[], []]
    }
    if (this._current_path.length === 0) {
      return [null, null]
    }
    var paths = JSONPath({ 'resultType': 'path', 'path': query, 'json': this._data })
    for (var i = 0; i < paths.length; i++) {
      var path = JSONPath.toPathArray(paths[i]).map(x => {
        var v = parseInt(x)
        if (!Object.is(NaN, v)) { return v }
        return x
      })
      var match = true
      for (var j = 0; j < this._current_path.length; j++) {
        if (path[j + 1] !== this._current_path[j]) {
          match = false
          break
        }
      }
      if (match) {
        return [path.slice(1), this._current_path.slice(path.length - 1)]
      }
    }
    return [null, null]
  }

  getCurrentMatchingPath (query) {
    return this.matchCurrentPath(query)[0]
  }

  getCurrentTrailingPath (query) {
    return this.matchCurrentPath(query)[1]
  }

  getPath (query) {
    var path = this.getCurrentMatchingPath(query)
    if (path) {
      return this.get(path)
    }
  }

  currentPath () {
    return this._current_path
  }

  currentIndex (level) {
    return this._current_path[level]
  }

  maxIndex (level) {
    return this._current_length[level] - 1
  }

  isStart (level) {
    return this._current_path[level] === 0
  }

  isEnd (level) {
    return this._current_path[level] === this.maxIndex(level)
  }

  start (level) {
    this.goto(level, 0)
  }

  previous (level) {
    this.goto(level, this._current_path[level] - 1)
  }

  next (level) {
    this.goto(level, this._current_path[level] + 1)
  }

  end (level) {
    this.goto(level, this.maxIndex(level))
  }

  registerHover (element, path) {
    element.on('mouseenter', (function (c) {
      return function () {
        c.gotoPath(path)
        return false
      }
    })(this))

    element.on('mouseleave', (function (c) {
      return function () {
        c.gotoLevel(path.length - 2)
        return false
      }
    })(this))
  }

  registerHoverHierarchy (element, selector, mapping) {
    selectHierarchy(element, selector).forEach(function (c) {
      return function (path, element) {
        let dataPath = path
        if (mapping) {
          dataPath = mapping[String(path)]
        }
        c.registerHover(element, dataPath)
      }
    }(this))
  }

  controls (element, level) {
    return new JSONControllerControls(this, element, level)
  }

  caption (element) {
    return new JSONControllerCaption(element)
  }

  highlight (element, selector, mapping) {
    return new JSONControllerHighlight(element, selector, mapping)
  }

  hint (element) {
    var h = new JSONControllerHint(element)
    this.registerListener(h.update.bind(h), '$..*')
    return h
  }
}

export default function (data) {
  return new JSONController(data)
}
