import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageLink, text) {
    super (popupSelector);
    this._image = imageLink;
    this._text = text;
  }

  open(imageLink, text) {
    super.open();
    this._popupSelector.querySelector('.popup__image').src = imageLink;
    this._popupSelector.querySelector('.popup__image-name').textContent = text;
    this._popupSelector.querySelector('.popup__image').alt = text;
  }
}