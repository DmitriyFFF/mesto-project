import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._nameImage = this._popup.querySelector('.popup__image-name');
  }

  open(name, link) {
    super.open();

    this._image.src = link;
    this._nameImage.textContent = name;
    this._image.alt = name;
  }
}
