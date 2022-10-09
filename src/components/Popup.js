/*import { handleEscapeKey, handleClosePopupOverlay } from '../utils/utils.js';
import { formProfile, cardsGallery, formCards, urlInput, namePlaceInput, cardSubmitButton, profileName, profileDescription, formAvatar, avatarInput, avatarSubmitButton, profileAvatar, profileAvatarEdit, userNameInput, aboutUserInput, profileSubmitButton, popupProfile, popupGallery, popupAvatar, openProfileButton, openAddCardButton } from '../utils/constants.js';*/

/*Новый код*/

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    //this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    //this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    //this.removeEventListeners();
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

   _handleClosePopupOverlay (evt) {
     if((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('popup_opened'))) {
       this.close(/*evt.currentTarget*/);
     }
   }

  setEventListeners() {
    /*this._popupSelector.closest('.popup__close').addEventListener('click', () => {
      this.close();
    });*///Ругается на этот слушатель

    this._popup.addEventListener('click', (evt) => {
      this._handleClosePopupOverlay(evt);
    });
    //document.addEventListener('keydown', this._handleEscClose);
  }

  /*removeEventListeners() {
    this._popupElement.closest('.popup__close').removeEventListener('click', () => {
      this.close();
    });

    this._popupElement.removeEventListener('click', () => {
      this.close();
    });
    document.removeEventListener('keydown', this._handleEscClose);
  }*/
}
/*
//***Функции открывания и закрывания форм по кнопкам
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
  popupElement.addEventListener('click', handleClosePopupOverlay);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleEscapeKey);
  popupElement.removeEventListener('click', handleClosePopupOverlay);
}

export function disableButton (button) {
  button.disabled = true;
}

//***Открывание попапов
openProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  userNameInput.value = profileName.textContent;
  aboutUserInput.value = profileDescription.textContent;
});

openAddCardButton.addEventListener('click', () => {
  openPopup(popupGallery);
});

profileAvatarEdit.addEventListener('click', () => {
  openPopup(popupAvatar);
});

profileAvatar.addEventListener('mouseover', () => {
  profileAvatarEdit.style.display = 'block';
});

profileAvatar.addEventListener('mouseout', () => {
  profileAvatarEdit.style.display = 'none';
});
 */
