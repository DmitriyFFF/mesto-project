// import {addCard, createCard} from '../components/Card.js';
// import {formProfile, formCards, formAvatar, cardsGallery, urlInput, namePlaceInput, profileName, profileDescription, profileAvatar, avatarInput, userNameInput, aboutUserInput, popupProfile, popupGallery, closePopup, disableButton, popupAvatar, profileSubmitButton, cardSubmitButton, avatarSubmitButton} from '../components/modal.js';
// import {enableValidation, validateSettings} from '../components/FormValidator.js';
// import '../pages/index.css';
// import { renderLoading, toggleLikeButton } from '../utils/utils.js';
// import { getInitialCards, getProfile, editProfile, addNewCard,  patchAvatar, addLikeApi, deleteLikeApi, deleteCardApi} from '../components/Api.js'
// import {profileData} from '../utils/constants.js';
// export let userId;

//Новый импорт
import {validateSettings,
        formProfile,
        formCards,
        formAvatar,
        popupImageSelector,
        popupAvatarSelector,
        avatarInput,
        avatarEditButton,
        popupProfileSelector,
        userNameInput,
        aboutUserInput,
        profileEditButton
} from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';

//Новый код

//"Экземпляр класса Api"
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '1a1c4ff3-29e4-400a-a3cb-d6bec25bd6e2',
    'Content-Type': 'application/json'
  }
}); // Передать конфиг

// Функциональность попапа открытия изображения карточки
const popupImage = new PopupWithImage(popupImageSelector);
// Активируем слушатели попапа изображения
popupImage.setEventListeners();

// Функциональность попапа редактирования Аватара пользователя
const popupAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleSubmitForm: handleAvatarFormSubmit
});

function handleAvatarFormSubmit() {
  evt.preventDefault();
  popupAvatar.renderLoading('Сохранить', true);

  api.patchAvatar(avatarInput)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupAvatar.disableButton();
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading('Сохранить', false);
    });
}

popupAvatar.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  popupAvatar.open();
});

// Функциональность попапа редактирования профиля пользователя
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleSubmitForm: handleProfileFormSubmit
});

function handleProfileFormSubmit() {
  evt.preventDefault();
  popupProfile.renderLoading('Сохранить', true);

  api.editProfile(userNameInput, aboutUserInput)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupProfile.disableButton();
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading('Сохранить', false);
    });
}

popupProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupProfile.open();
});


//"Экземпляры класса FormValidator для всех форм"
const formProfileValidator = new FormValidator(validateSettings, formProfile);
const formCardValidator = new FormValidator(validateSettings, formCards);
const formAvatarValidator = new FormValidator(validateSettings, formAvatar);

//Валидация форм
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();



/***********************  Старый код  **********************/

//Функция добавления лайка
export function addLike(cardId, likesCounter, likesButton) {
  addLikeApi(cardId)
    .then((res) => {
      toggleLikeButton(res, likesCounter, likesButton);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция снятия лайка
export function deleteLike(cardId, likesCounter, likesButton) {
  deleteLikeApi(cardId)
    .then((res) => {
      toggleLikeButton(res, likesCounter, likesButton);
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

function setProfileData(profileData, res) {
  profileData.name.textContent = res.name;
  profileData.description.textContent = res.about;
  profileData.avatar.src = res.avatar;
}

//***Функция сохранения информации о пользователе из формы***//
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, 'Сохранить', true);

  editProfile(userNameInput, aboutUserInput)
    .then((result) => {
      setProfileData(profileData, result);
      disableButton(profileSubmitButton);
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
  renderLoading(cardSubmitButton, 'Создать', true);

  addNewCard(urlInput, namePlaceInput)
    .then((result) => {
      addCard(cardsGallery, createCard(result.link, result.name, result.likes, result.owner._id, [], result._id, addLike, deleteLike, deleteCard));
      formCards.reset();
      disableButton(cardSubmitButton);
      closePopup(popupGallery);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(cardSubmitButton, 'Создать', false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarSubmitButton, 'Сохранить', true);

  patchAvatar(avatarInput)
    .then((result) => {
      setProfileData(profileData, result);
      formAvatar.reset();
      disableButton(avatarSubmitButton);
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarSubmitButton, 'Сохранить', false);
    });
}

//***Получение данных о пользователе и загрузка карточек с сервера***//
Promise.all([getProfile(), getInitialCards()])
  .then(([userData, cards]) => {
      setProfileData(profileData, userData);
      userId = userData._id;
      cards.forEach((item) => {
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
