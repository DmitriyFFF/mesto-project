export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items, userInfo) {
    this.clear();

    items.reverse().forEach((item) => {
      this._renderer(item, userInfo);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
