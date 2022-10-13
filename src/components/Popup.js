export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

   _handleClosePopupOverlay (evt) {
     if((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('popup_opened'))) {
       this.close();
     }
   }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this._handleClosePopupOverlay(evt);
    });
  }
}
