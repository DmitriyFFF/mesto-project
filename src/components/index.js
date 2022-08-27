import {initialCards,addCard, createCard} from './card.js';
import {formProfile, formCards, cardsGallery, handleCardFormSubmit, handleProfileFormSubmit} from './modal.js';
import {enableValidation} from './validate.js';

//***Обработка отправки форм***//
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);

//***Создание карточек из массива данных***//
initialCards.forEach(function(item){
  addCard(cardsGallery, createCard(item.link, item.name));
});

//***Валидация форм***//
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  //inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});



