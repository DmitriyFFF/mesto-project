import { handleEscapeKey, handleClosePopupOverlay } from '../utils/utils.js';

//Новый импорт
import { formProfile, cardsGallery, formCards, urlInput, namePlaceInput, cardSubmitButton, profileName, profileDescription, formAvatar, avatarInput, avatarSubmitButton, profileAvatar, profileAvatarEdit, userNameInput, aboutUserInput, profileSubmitButton, popupProfile, popupGallery, popupAvatar, openProfileButton, openAddCardButton } from '../utils/constants.js';

/*Новый код*/

export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened'); // ?
      this.close(popupOpened); //?
    }
  }

  // _handleClosePopupOverlay (evt) {
  //   if((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('popup_opened'))) {
  //     this.close(evt.currentTarget);
  //   }
  // }

  open() {
    this._selector.classList.add('popup_opened');
  }

  close() {
    this._selector.classList.remove('popup_opened');
  }

// Слушатель клика по иконке закрытия popup
  setEventListeners() {
    this._selector.closest('.popup__close').addEventListener('click', () => {
      this.close();
    });
    // ?
    this._selector.addEventListener('click', () => {
      this.close();
    });
  }
}

//***Функции открывания и закрывания форм по кнопкам ***//
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

//***Открывание попапов***//
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
