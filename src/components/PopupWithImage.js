import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._text = this._popup.querySelector('.popup__image-name');
  }

  open(imageLink, text) {
    super.open();

    this._image.src = imageLink;
    this._text.textContent = text;
    this._image.alt = text;
  }
}
