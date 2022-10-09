export default class Section {
  constructor({ /*data,*/ renderer }, containerSelector) {
    //this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this.clear();

    items.forEach((item) => {
      //const cardElement = this._renderer(item);
      //this.addItem(cardElement);
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
