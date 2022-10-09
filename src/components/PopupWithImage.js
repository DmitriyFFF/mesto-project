import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._nameImage = this._popup.querySelector('.popup__image-name');
  }

  open(data) {
    super.open();

    this._image.src = data.link;
    this._nameImage.textContent = data.name;
    this._image.alt = data.name;
  }
}
