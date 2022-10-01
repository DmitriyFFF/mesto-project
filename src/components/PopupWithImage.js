import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, image, text) {
    super (selector);
    this._image = image;
    this._text = text;
  }

  open() {
    super.open();
    this._selector.querySelector('.popup__image').src = this._image;
    this._selector.querySelector('.popup__image-name').textContent = this._text;
    this._selector.querySelector('.popup__image').alt = this._text; //?
  }
}