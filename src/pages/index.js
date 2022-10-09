// import {addCard, createCard} from '../components/Card.js';
// import {formProfile, formCards, formAvatar, cardsGallery, urlInput, namePlaceInput, profileName, profileDescription, profileAvatar, avatarInput, userNameInput, aboutUserInput, popupProfile, popupGallery, closePopup, disableButton, popupAvatar, profileSubmitButton, cardSubmitButton, avatarSubmitButton} from '../components/modal.js';
// import {enableValidation, validateSettings} from '../components/FormValidator.js';
import '../pages/index.css';
// import { renderLoading, toggleLikeButton } from '../utils/utils.js';
// import { getInitialCards, getProfile, editProfile, addNewCard,  patchAvatar, addLikeApi, deleteLikeApi, deleteCardApi} from '../components/Api.js'
// import {profileData} from '../utils/constants.js';
export let userId;

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
        profileEditButton,
        popupCardSelector,
        urlInput,
        namePlaceInput,
        profileName,
        profileDescription,
        profileAvatar,
        cardsGallery,
        openAddCardButton,
        cardTemplate
} from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';

//Новый код

//"Экземпляр класса Api"
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '1a1c4ff3-29e4-400a-a3cb-d6bec25bd6e2',
    'Content-Type': 'application/json'
  }
}); // Передать конфиг


Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
      userInfo.setUserInfo(userData);
      cards.renderItems(cardsData);
      userId = userData._id;
  })
  .catch((err) => {
    console.log(err);
  });

const cards = new Section (
  {
    renderer: getCard,
  },

  //data: result,
  /*renderer: (item) => {
    //const newCard = new Card(item, '.card')
    const card = getCard(item);
    const cardItem = card.generate();
    cards.addItem(cardItem);
  }},*/
  '.elements__gallery'
);

//"Экземпляры класса FormValidator для всех форм"
const formProfileValidator = new FormValidator(validateSettings,formProfile);
const formCardValidator = new FormValidator(validateSettings,formCards);
const formAvatarValidator = new FormValidator(validateSettings,formAvatar);

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  profileAvatar: '.profile__avatar'
});

const getCard = (data) => {
  const card = new Card(
    data,
    handleCardClick,
    handleLikeCard,
    handleDeleteCard,
    '#card-template',
    userId
  );
  const newCard = card.generate();
  return newCard;
}

// Функциональность попапа открытия изображения карточки
const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

// Функциональность попапа редактирования профиля пользователя
const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  handleProfileFormSubmit
);
popupProfile.setEventListeners();

// Функциональность попапа добавления новой карточки пользователя
const popupCard = new PopupWithForm(
  '.popup_type_gallery',
  handleCardFormSubmit
);
popupCard.setEventListeners();


// Функциональность попапа редактирования Аватара пользователя
const popupAvatar = new PopupWithForm(
  '.popup_type_avatar',
  handleAvatarFormSubmit
);
popupAvatar.setEventListeners();


function handleAvatarFormSubmit() {
  //evt.preventDefault();
  popupAvatar.renderLoading('Сохранить', true);

  api.patchAvatar(avatarInput)
    .then((result) => {
      userInfo.setUserInfo(result);
      //popupAvatar.disableButton();
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading('Сохранить', false);
    });
}

// formsAvatar.addEventListener('submit', handleAvatarFormSubmit());

function handleProfileFormSubmit() {
  //evt.preventDefault();
  popupProfile.renderLoading('Сохранить', true);

  api.editProfile(userNameInput, aboutUserInput)
    .then((result) => {
      userInfo.setUserInfo(result);
      //popupProfile.disableButton();
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading('Сохранить', false);
    });
}

function handleCardFormSubmit() {
  //evt.preventDefault();
  popupCard.renderLoading('Создать', true);

  api.addNewCard(urlInput, namePlaceInput)
    .then((result) => {
      cards.addItem(getCard(result));
      /*const newCard = getCard(result);
      newCard.generate();
      newCard.renderer();*/
      //popupCard.disableButton();
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading('Создать', false);
    });
  }

function handleLikeCard(card) {
  if (card.checkUserLikes()) {
    api.deleteLikeApi(card.cardId)
      .then((result) => {
        card.deleteLike(result.likes.length);
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.addLikeApi(card.cardId)
      .then((result) => {
        card._addLike(result.likes.length);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

function handleDeleteCard(card) {
  api.deleteCardApi(card.cardId)
  .then(() => {
    card._deleteCard();
  })
  .catch((err) => {
    console.log(err);
  });
}

function handleCardClick(/*result*/name, link) {
  popupImage.open(/*result*/name, link);
}

//Валидация форм
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();

avatarEditButton.addEventListener('click', () => {
  popupAvatar.open();
});

profileEditButton.addEventListener('click', () => {
  popupProfile.open();
  const userData = userInfo.getUserInfo();
  userNameInput.value = userData.name;
  aboutUserInput.value = userData.description;
});

openAddCardButton.addEventListener('click', () => {
  popupCard.open();
});



// profileAvatar.addEventListener('mouseover', () => {
//   profileAvatarEdit.style.display = 'block';
// });

// profileAvatar.addEventListener('mouseout', () => {
//   profileAvatarEdit.style.display = 'none';
// });






/***********************  Старый код  **********************/
/*
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

//***Функция сохранения информации о пользователе из формы***
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

//***Функция добавления новой карточки из формы***
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

//***Получение данных о пользователе и загрузка карточек с сервера
Promise.all([getProfile(), getInitialCards()])
  .then(([userData, cards]) => {
      setProfileData(profileData, userData);
      userId = userData._id;
      cards.forEach((item) => {
        cards.renderer()
        addCard(cardsGallery, createCard(item.link, item.name, item.likes, item.owner._id, [], item._id, addLike, deleteLike, deleteCard));
      })
  })
  .catch((err) => {
    console.log(err);
  });

//***Обработка отправки форм
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);

//***Валидация форм**
enableValidation(validateSettings);
 */
