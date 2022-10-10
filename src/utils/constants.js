export const formProfile = document.querySelector('.form_type_profile');
export const formCards = document.querySelector('.form_type_cards');
export const urlInput = formCards.querySelector('.form__input_type_url');
export const namePlaceInput = formCards.querySelector('.form__input_type_place');
export const cardSubmitButton = formCards.querySelector('.form__button');
export const formAvatar = document.querySelector('.form_type_avatar');
export const avatarInput = formAvatar.querySelector('.form__input_type_avatar');
export const avatarSubmitButton = formAvatar.querySelector('.form__button');
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
export const popupImage = popupImageSelector.querySelector('.popup__image');
export const popupImageName = popupImageSelector.querySelector('.popup__image-name');
export const profileAvatar = document.querySelector('.profile__avatar');

export const cardTemplateSelector = '#card-template';
export const cardsContainerSelector = '.elements__gallery';
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';

export const validateSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
