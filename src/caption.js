export class JSONControllerCaption {
  constructor (element) {
    this._element = element
  }

  update (data, duration, path) {
    this._element.html(data)
  }
}
