const PREV_BUTTON_SVG = 'M170.711,170.711a100,100,0,1,1,0-141.422A100,100,0,0,1,170.711,170.711ZM121.945,63.426a6.9,6.9,0,0,0-9.754-9.753L70.74,95.123a6.9,6.9,0,0,0,0,9.754l41.451,41.451a6.9,6.9,0,1,0,9.754-9.754L85.37,100Z'
const NEXT_BUTTON_SVG = 'M29.289,29.289a100,100,0,1,1,0,141.422A100,100,0,0,1,29.289,29.289ZM78.055,136.574a6.9,6.9,0,1,0,9.753,9.754l41.451-41.451a6.9,6.9,0,0,0,0-9.754L87.809,53.672a6.9,6.9,0,0,0-9.753,9.753L114.63,100Z'

/** The JSONControllerControls class defines a UI widget which can be used to
  * click back and forth between different slices of data at a given path.
  */
export class JSONControllerControls {
  constructor (controller, element, level) {
    this._controller = controller
    this._element = element
    this._level = level
    this._controller.registerListener(this.update.bind(this), '$.*')
    this.draw()
  }

  /**
    * Draws the forwards and backwards buttons and a text input which lets users
    * jump directly to a specific index. Also, adds mouse handlers.
    */
  draw () {
    this.playback_container = this._element.append('div')
      .attr('class', 'json-controller-controls')

    this.prevButton = this.playback_container.append('button')
      .on('mousedown', (function (c) {
        return function () {
          c._controller.previous(c._level)
        }
      }(this)))

    var prevButtonIcon = this.prevButton.append('svg')
      .attr('viewBox', '0 0 200 200')
      .attr('width', 20)
      .attr('height', 20)
    prevButtonIcon.append('path')
      .attr('fill', '#b0b0b0')
      .attr('d', PREV_BUTTON_SVG)

    var jump = this.playback_container.append('span')
      .attr('class', 'jump')
    this._jump_input = jump.append('input')
      .attr('value', 0)
      .on('change', (function (c) {
        return function () {
          c._controller.goto(c._level, c._jump_input.node().value)
        }
      }(this)))

    this.next_button = this.playback_container.append('button')
      .on('mousedown', (function (c) {
        return function () {
          c._controller.next(c._level)
        }
      }(this)))

    var nextButtonIcon = this.next_button.append('svg')
      .attr('viewBox', '0 0 200 200')
      .attr('width', 20)
      .attr('height', 20)
    nextButtonIcon.append('path')
      .attr('fill', '#b0b0b0')
      .attr('d', NEXT_BUTTON_SVG)
  }

  update (path, data) {
    if (this._controller.isStart(this._level)) {
      this.prevButton.attr('disabled', '')
    } else {
      this.prevButton.attr('disabled', null)
    }
    var currentIndex = this._controller.currentIndex(this._level)
    this._jump_input.node().value = currentIndex
    if (this._controller.isEnd(this._level)) {
      this.next_button.attr('disabled', '')
    } else {
      this.next_button.attr('disabled', null)
    }
  }
}
