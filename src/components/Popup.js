import { handleEscapeKey, handleClosePopupOverlay } from '../utils/utils.js';

//Новый импорт
import { formProfile, cardsGallery, formCards, urlInput, namePlaceInput, cardSubmitButton, profileName, profileDescription, formAvatar, avatarInput, avatarSubmitButton, profileAvatar, profileAvatarEdit, userNameInput, aboutUserInput, profileSubmitButton, popupProfile, popupGallery, popupAvatar, openProfileButton, openAddCardButton } from '../utils/constants.js';

/*Новый код*/

export class Popup {
  constructor(selector) {

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
