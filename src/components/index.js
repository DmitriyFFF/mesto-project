import {initialCards,addCard, createCard} from './card.js';
import {formProfile, formCards, cardsGallery, urlInput, namePlaceInput, profileName, profileDescription, userNameInput, aboutUserInput, popupProfile, popupGallery, closePopup} from './modal.js';
import {enableValidation, validateSettings} from './validate.js';
import '../pages/index.css';

//***Функция сохранения информации о пользователе из формы***//
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  const buttonSubmit = formProfile.querySelector('.form__button');

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  if (!buttonSubmit.hasAttribute('disabled')) {
    buttonSubmit.setAttribute('disabled', true)
  } else {
    buttonSubmit.removeAttribute('disabled')
  }

  closePopup(popupProfile);
}

//***Функция добавления новой карточки из формы***//
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const buttonSubmit = formCards.querySelector('.form__button');

  addCard(cardsGallery, createCard(urlInput.value, namePlaceInput.value));

  formCards.reset();

  if (!buttonSubmit.hasAttribute('disabled')) {
    buttonSubmit.setAttribute('disabled', true)
  } else {
    buttonSubmit.removeAttribute('disabled')
  }

  closePopup(popupGallery);
}

//***Обработка отправки форм***//
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);

//***Создание карточек из массива данных***//
initialCards.forEach(function(item){
  addCard(cardsGallery, createCard(item.link, item.name));
});

//***Валидация форм***//
enableValidation(validateSettings);
