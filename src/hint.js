export class JSONControllerHint {
  constructor (element) {
    this._element = element
    this._element.classed('d3-json-controller-hint', true)
  }

  update (data, duration, path) {
    if (path) {
      this._element.style('display', 'none')
    } else {
      this._element.style('display', null)
    }
  }
}
