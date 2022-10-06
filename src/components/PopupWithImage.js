import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, text) {
    super (popupSelector);
    this._image = image;
    this._text = text;
  }

  open() {
    super.open();
    this._popupSelector.querySelector('.popup__image').src = this._image;
    this._popupSelector.querySelector('.popup__image-name').textContent = this._text;
    this._popupSelector.querySelector('.popup__image').alt = this._text; //?
  }
}