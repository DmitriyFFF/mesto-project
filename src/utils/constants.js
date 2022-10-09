/*константы из modals.js*/
export const formProfile = document.querySelector('.form_type_profile');
export const cardsGallery = document.querySelector('.elements__gallery');
export const formCards = document.querySelector('.form_type_cards');
export const urlInput = formCards.querySelector('.form__input_type_url');
export const namePlaceInput = formCards.querySelector('.form__input_type_place');
export const cardSubmitButton = formCards.querySelector('.form__button');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const formAvatar = document.querySelector('.form_type_avatar');
export const avatarInput = formAvatar.querySelector('.form__input_type_avatar');
export const avatarSubmitButton = formAvatar.querySelector('.form__button');
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarEditButton = document.querySelector('.profile__avatar-edit');
export const userNameInput = formProfile.querySelector('.form__input_type_name');
export const aboutUserInput = formProfile.querySelector('.form__input_type_about');
export const profileSubmitButton = formProfile.querySelector('.form__button');
export const popupProfileSelector = document.querySelector('.popup_type_profile');
export const popupCardSelector = document.querySelector('.popup_type_gallery');
export const popupAvatarSelector = document.querySelector('.popup_type_avatar');
export const popupImageSelector = document.querySelector('.popup_type_photo');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const openAddCardButton = document.querySelector('.profile__add-card-button');

/*константы из card.js */
export const cardTemplate = document.querySelector('#card-template');
export const popupImage = popupImageSelector.querySelector('.popup__image');
export const popupImageName = popupImageSelector.querySelector('.popup__image-name');

/*константы из validate.js */
export const validateSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

/*константы из index.js */
/*export const profileData = {
  name: profileName,
  description: profileDescription,
  avatar: profileAvatar
};*/

/*
*Код из utils.js
*/
/* import {closePopup} from '../components/modal.js';

export function handleEscapeKey (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

export function handleClosePopupOverlay (evt) {
  if((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('popup_opened'))) {
    closePopup(evt.currentTarget);
  }
}

export function renderLoading(button, textButton, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = textButton;
  }
} */

/*перенес в api.js
export function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}*/

/* export function toggleLikeButton(result, likesCounter, likeButton) {
  likesCounter.textContent = result.likes.length;
  likeButton.classList.toggle('card__button_active');
} */
