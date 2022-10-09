// import {addCard, createCard} from '../components/Card.js';
// import {formProfile, formCards, formAvatar, cardsGallery, urlInput, namePlaceInput, profileName, profileDescription, profileAvatar, avatarInput, userNameInput, aboutUserInput, popupProfile, popupGallery, closePopup, disableButton, popupAvatar, profileSubmitButton, cardSubmitButton, avatarSubmitButton} from '../components/modal.js';
// import {enableValidation, validateSettings} from '../components/FormValidator.js';
import '../pages/index.css';
// import { renderLoading, toggleLikeButton } from '../utils/utils.js';
// import { getInitialCards, getProfile, editProfile, addNewCard,  patchAvatar, addLikeApi, deleteLikeApi, deleteCardApi} from '../components/Api.js'
// import {profileData} from '../utils/constants.js';
let userId;

//Новый импорт
import {validateSettings,
        formProfile,
        formCards,
        formAvatar,
        popupImageSelector,
        popupAvatarSelector,
        popupProfileSelector,
        popupCardSelector,
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
        openAddCardButton
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


const cards = new Section ({
    renderer: (item) => {
      const cardItem = getCard(item);
      cards.addItem(cardItem);
    }},
    cardsContainerSelector
);

//"Экземпляры класса FormValidator для всех форм"
const formProfileValidator = new FormValidator(validateSettings,formProfile);
const formCardValidator = new FormValidator(validateSettings,formCards);
const formAvatarValidator = new FormValidator(validateSettings,formAvatar);

const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector
});

const getCard = (data) => {
  const card = new Card(
    data,
    cardTemplateSelector,
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

// formsAvatar.addEventListener('submit', handleAvatarFormSubmit());

function handleProfileFormSubmit() {
  //evt.preventDefault();
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

function handleCardFormSubmit() {
  //evt.preventDefault();
  popupCard.renderLoading('Создать', true);

  api.addNewCard(urlInput, namePlaceInput)
    .then((result) => {
      cards.addItem(getCard(result));
      /*const newCard = getCard(result);
      newCard.generate();
      newCard.renderer();*/
      popupCard.disableButton();
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading('Создать', false);
    });
  }

function handleLikeCard(cardElement) {
  if (cardElement._checkUserLikes()) {
    api.deleteLikeApi(cardElement._cardId)
      .then((result) => {
        cardElement._deleteLike(result.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.addLikeApi(cardElement._cardId)
      .then((result) => {
        cardElement._addLike(result.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
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

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    console.log(cardsData);
    cards.renderItems(cardsData);
    userId = userData._id;
  })
  .catch((err) => {
    console.log(err);
  });

//  profileAvatar.addEventListener('mouseover', () => {
//   avatarEditButton.style.display = 'block';
//  });

//  profileAvatar.addEventListener('mouseout', () => {
//   avatarEditButton.style.display = 'none';
//  });

 //Валидация форм
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();