import {/*initialCards,*/addCard, createCard} from './card.js';
import {formProfile, formCards, cardsGallery, urlInput, namePlaceInput, profileName, profileDescription, profileAvatar, userNameInput, aboutUserInput, popupProfile, popupGallery, closePopup, disableButton} from './modal.js';
import {enableValidation, validateSettings} from './validate.js';
import '../pages/index.css';

import { getInitialCards, getProfile, editProfile } from './api.js'

getProfile()
  .then((result) => {
    console.log(result);
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.img = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

/*fetch('https://nomoreparties.co/v1/plus-cohort-14/users/me', {
  headers: {
    method: 'GET',
    authorization: '1a1c4ff3-29e4-400a-a3cb-d6bec25bd6e2'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.img = result.avatar;
  });*/

//***Функция сохранения информации о пользователе из формы***//
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  editProfile(userNameInput, aboutUserInput)
    //.then(getProfile())
    .then((result) => {
      console.log(result);
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.img = result.avatar;
    })

    /*.then((result) => {
      console.log(result);
      // обрабатываем результат
      result.name = userNameInput.value;
      result.about = aboutUserInput.value;
    })*/
    .catch((err) => {
      console.log(err);
    });

  /*profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;*/

  disableButton();

  closePopup(popupProfile);
}

//***Функция добавления новой карточки из формы***//
function handleCardFormSubmit (evt) {
  evt.preventDefault();

  addCard(cardsGallery, createCard(urlInput.value, namePlaceInput.value));

  formCards.reset();

  disableButton();

  closePopup(popupGallery);
}

//***Обработка отправки форм***//
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);

//***Создание карточек из массива данных***//
getInitialCards()
  .then((result) => {
    console.log(result);
    // обрабатываем результат
    result.forEach((item) => {
      addCard(cardsGallery, createCard(item.link, item.name));
    })
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//***Валидация форм***//
enableValidation(validateSettings);

/*initialCards.forEach(function(item){
  /*fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
    headers: {
      method: 'GET',
      authorization: '1a1c4ff3-29e4-400a-a3cb-d6bec25bd6e2'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    item.link = result.link;
    item.name = result.name;

  });*/
  /*addCard(cardsGallery, createCard(item.link, item.name));
});*/
