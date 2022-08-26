/*import {formProfile, formCards, cardsGallery, initialCards} from './variables.js';*/
import {addCard, createCard} from './card.js';
import {handleCardFormSubmit, handleProfileFormSubmit} from './modal.js';
import {enableValidation} from './validate.js';

const formProfile = document.querySelector('.form_type_profile');
const formCards = document.querySelector('.form_type_cards');
const cardsGallery = document.querySelector('.elements__gallery');
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1571649425554-e94518844c37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1602923632045-d29f261735ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1607516100924-9a3f2c801cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1886&q=80'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1637579176819-36455abf2e97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
  ];
//***Обработка отправки форм***//

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);


//***Создание карточек из массива данных***//

initialCards.forEach(function(item){
  addCard(cardsGallery, createCard(item.link, item.name));
});


//***Валидация форм***//

enableValidation(/*{
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  //inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}*/);



