import { selectHierarchy } from './selection'

export class JSONControllerHighlight {
  constructor (element, selector, mapping) {
    this._hierarchicalSelection = selectHierarchy(element, selector)
    this._mapping = mapping

    this._reverseMapping = null
    if (this._mapping) {
      this._reverseMapping = {}
      for (let k of Object.keys(this._mapping)) {
        var p = k.split(',').filter(x => x.length > 0).map(x => parseInt(x))
        this._reverseMapping[this._mapping[k]] = p
      }
    }
  }

  update (data, duration, dataPath) {
    let highlightPath = dataPath
    if (this._mapping) {
      highlightPath = this._mapping[String(dataPath)]
    }
    this._hierarchicalSelection.forEach(function (path, element) {
      element.classed('d3-json-controller-selected', function (d, i) {
        return path && highlightPath && path.toString() === highlightPath.toString()
      })
    })
  }

  reverseMapping () {
    return this._reverseMapping
  }
}
