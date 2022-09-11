import {keyHandler, overlayHandler} from './utils.js';

export const formProfile = document.querySelector('.form_type_profile');
export const cardsGallery = document.querySelector('.elements__gallery');
export const formCards = document.querySelector('.form_type_cards');
export const urlInput = formCards.querySelector('.form__input_type_url');
export const namePlaceInput = formCards.querySelector('.form__input_type_place');
export const cardsSubmitButton = formCards.querySelector('.form__button');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const formAvatar = document.querySelector('.form_type_avatar');
export const avatarInput = formAvatar.querySelector('.form__input_type_avatar')
export const avatarSubmitButton = formAvatar.querySelector('.form__button');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarEdit = document.querySelector('.profile__avatar-edit');
export const userNameInput = formProfile.querySelector('.form__input_type_name');
export const aboutUserInput = formProfile.querySelector('.form__input_type_about');
export const profileSubmitButton = formProfile.querySelector('.form__button');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupGallery = document.querySelector('.popup_type_gallery');
export const popupAvatar = document.querySelector('.popup_type_avatar');
const openProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-card-button');


//***Функции открывания и закрывания форм по кнопкам ***//
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', keyHandler);
  popupElement.addEventListener('click', overlayHandler);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', keyHandler);
  popupElement.removeEventListener('click', overlayHandler);
}

export function disableButton () {
  const buttonsSubmit = document.querySelectorAll('.form__button');
  buttonsSubmit.forEach((item) => {
    if ((!item.hasAttribute('disabled')) || (item.closest('.form__button'))){
      item.setAttribute('disabled', true);
    } else {
      item.removeAttribute('disabled');
    }
  })
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
