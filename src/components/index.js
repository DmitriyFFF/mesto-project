import {addCard, createCard} from './card.js';
import {formProfile, formCards, formAvatar, cardsGallery, urlInput, namePlaceInput, profileName, profileDescription, profileAvatar, avatarInput, userNameInput, aboutUserInput, popupProfile, popupGallery, closePopup, disableButton, popupAvatar, profileSubmitButton, cardsSubmitButton, avatarSubmitButton} from './modal.js';
import {enableValidation, validateSettings} from './validate.js';
import '../pages/index.css';
import { renderLoading, toggleLikeButtom } from './utils.js';
import { getInitialCards, getProfile, editProfile, addNewCard,  patchAvatar, addLikeApi, deleteLikeApi, deleteCardApi} from './api.js'
//export const myId = "ef92df96a74176633fe20450";
export let userId;

//Функция добавления лайка
export function addLike(cardId, likesCounter, likesButton) {
  addLikeApi(cardId)
    .then((res) => {
      toggleLikeButtom(res, likesCounter, likesButton, true);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция снятия лайка
export function deleteLike(cardId, likesCounter, likesButton) {
  deleteLikeApi(cardId)
    .then((res) => {
      toggleLikeButtom(res, likesCounter, likesButton, false);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция удаления карточек
export function deleteCard(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//***Функция сохранения информации о пользователе из формы***//
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, 'Сохранить', true);

  editProfile(userNameInput, aboutUserInput)
    .then((result) => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.src = result.avatar;
      disableButton();
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileSubmitButton, 'Сохранить', false);
    });
}

//***Функция добавления новой карточки из формы***//
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(cardsSubmitButton, 'Создать', true);

  addNewCard(urlInput, namePlaceInput)
    .then((result) => {
      addCard(cardsGallery, createCard(result.link, result.name, result.likes, result.owner._id, [], result._id, addLike, deleteLike, deleteCard));
      formCards.reset();
      disableButton();
      closePopup(popupGallery);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(cardsSubmitButton, 'Создать', false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarSubmitButton, 'Сохранить', true);

  patchAvatar(avatarInput)
    .then((result) => {
      profileAvatar.src = result.avatar;
      formAvatar.reset();
      disableButton();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarSubmitButton, 'Сохранить', false);
    });
}

//***Получение данных о пользователе с сервера***//
getProfile()
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.src = result.avatar;
    userId = result._id;
  })
  .catch((err) => {
    console.log(err);
  });

//***Загрузка карточек с сервера***//
getInitialCards()
  .then((result) => {
    result.forEach((item) => {
      addCard(cardsGallery, createCard(item.link, item.name, item.likes, item.owner._id, [], item._id, addLike, deleteLike, deleteCard));
    })
  })
  .catch((err) => {
    console.log(err);
  });

//***Обработка отправки форм***//
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);

//***Валидация форм***//
enableValidation(validateSettings);
