import {addCard, createCard} from './card.js';
import {keyHandler, overlayHandler} from './utils.js';

export const formProfile = document.querySelector('.form_type_profile');
export const cardsGallery = document.querySelector('.elements__gallery');
export const formCards = document.querySelector('.form_type_cards');
const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const userNameInput = formProfile.querySelector('.form__input_type_name');
const aboutUserInput = formProfile.querySelector('.form__input_type_about');
const popupGallery = document.querySelector('.popup_type_gallery');
const urlInput = formCards.querySelector('.form__input_type_url');
const namePlaceInput = formCards.querySelector('.form__input_type_place');
const openProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-card-button');


//***Функции открывания и закрывания форм по кнопкам ***//
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', overlayHandler);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', overlayHandler);
}

//***Функция сохранения информации о пользователе из формы***//
export function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  closePopup(popupProfile);
}

//***Функция добавления новой карточки из формы***//
export function handleCardFormSubmit (evt) {
  evt.preventDefault();

  addCard(cardsGallery, createCard(urlInput.value, namePlaceInput.value));

  formCards.reset();

  closePopup(popupGallery);
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
