import '../pages/index.css';
import {validateSettings,
        formProfile,
        formCards,
        formAvatar,
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
        cardsContainerSelector,
        cardTemplateSelector,
        avatarInput,
        avatarEditButton,
        userNameInput,
        aboutUserInput,
        profileEditButton,
        urlInput,
        namePlaceInput,
        openAddCardButton,
        profileAvatar
      } from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
let userId;

//"Экземпляр класса Api"
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '1a1c4ff3-29e4-400a-a3cb-d6bec25bd6e2',
    'Content-Type': 'application/json'
  }
});

//"Экземпляр класса Section"
const cards = new Section ({
    renderer: (item, userData) => {
      const cardItem = getCard(item, userData);
      cards.addItem(cardItem);
    }},
    cardsContainerSelector
);

//"Экземпляры класса FormValidator для всех форм"
const formProfileValidator = new FormValidator(validateSettings,formProfile);
const formCardValidator = new FormValidator(validateSettings,formCards);
const formAvatarValidator = new FormValidator(validateSettings,formAvatar);

//"Экземпляр класса UserInfo"
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector
});

//Создание новой карточки и экземпляра класа Card
const getCard = (data, userData) => {
  const card = new Card(
    data,
    cardTemplateSelector,
    userData,
    handleCardClick,
    handleLikeCard,
    handleDeleteCard,
    userId
  );
  const newCard = card.generate();
  return newCard;
}

// Функциональность попапа открытия изображения карточки
const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// Функциональность попапа редактирования профиля пользователя
const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  handleProfileFormSubmit
);
popupProfile.setEventListeners();

function handleProfileFormSubmit() {
  popupProfile.renderLoading('Сохранить', true);

  api.editProfile(userNameInput, aboutUserInput)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading('Сохранить', false);
    });
}

// Функциональность попапа редактирования Аватара пользователя
const popupAvatar = new PopupWithForm(
  '.popup_type_avatar',
  handleAvatarFormSubmit
);
popupAvatar.setEventListeners();

function handleAvatarFormSubmit() {
  popupAvatar.renderLoading('Сохранить', true);

  api.patchAvatar(avatarInput)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading('Сохранить', false);
    });
}

// Функциональность попапа добавления новой карточки пользователя
const popupCard = new PopupWithForm(
  '.popup_type_gallery',
  handleCardFormSubmit
);
popupCard.setEventListeners();

function handleCardFormSubmit() {
  popupCard.renderLoading('Создать', true);

  api.addNewCard(urlInput, namePlaceInput)
    .then((result) => {
      cards.addItem(getCard(result, userInfo.getUserInfo()));
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading('Создать', false);
    });
}

//Обработчики лайков, удаления карточки
function handleLikeCard(cardElement) {
  if (cardElement.checkUserLikes()) {
    api.deleteLikeApi(cardElement._cardId)
      .then((res) => {
        cardElement.updateLikeState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.addLikeApi(cardElement._cardId)
      .then((res) => {
        cardElement.updateLikeState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDeleteCard(cardElement) {
  api.deleteCardApi(cardElement._cardId)
  .then(() => {
    cardElement.deleteCard();
  })
  .catch((err) => {
    console.log(err);
  });}

//Слушатели кнопок открывания попапов
avatarEditButton.addEventListener('click', () => {
  formAvatarValidator.resetFormValidation();
  popupAvatar.open();
});

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  userNameInput.value = userData.name;
  aboutUserInput.value = userData.description;
  formProfileValidator.resetFormValidation();
  popupProfile.open();
});

openAddCardButton.addEventListener('click', () => {
  formCardValidator.resetFormValidation();
  popupCard.open();
});

//Слушатель наведения на аватар
profileAvatar.addEventListener('mouseover', () => {
  avatarEditButton.style.display = 'block';
 });

 profileAvatar.addEventListener('mouseout', () => {
  avatarEditButton.style.display = 'none';
 });

//Запрос на получение общих данных с сервера
Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    cards.renderItems(cardsData, userData);
  })
  .catch((err) => {
    console.log(err);
  });

 //Валидация форм
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();
