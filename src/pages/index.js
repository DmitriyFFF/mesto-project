import '../pages/index.css';
import {validateSettings,
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
        cardsContainerSelector,
        cardTemplateSelector,
        avatarEditButton,
        profileEditButton,
        openAddCardButton,
        profileAvatar,
        popupAvatarSelector,
        popupCardSelector,
        popupImageSelector,
        popupProfileSelector
      } from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';

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
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};


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
  );
  const newCard = card.generate();
  return newCard;
}

// Функциональность попапа открытия изображения карточки
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// Функциональность попапа редактирования профиля пользователя
const popupProfile = new PopupWithForm(
  popupProfileSelector,
  handleProfileFormSubmit
);
popupProfile.setEventListeners();

function handleProfileFormSubmit(formData) {
  const {
    popupInputProfileName: name,
    popupInputProfileAbout: about
  } = formData;
  popupProfile.renderLoading(true);
  api.editProfile({ name, about })
    .then((result) => {
      userInfo.setUserInfo(result);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
}

// Функциональность попапа редактирования Аватара пользователя
const popupAvatar = new PopupWithForm(
  popupAvatarSelector,
  handleAvatarFormSubmit
);
popupAvatar.setEventListeners();

function handleAvatarFormSubmit(formData) {

  const {
    popupInputAvatarPhoto: link,
  } = formData;
  popupAvatar.renderLoading(true);
  api.patchAvatar({link})
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

// Функциональность попапа добавления новой карточки пользователя
const popupCard = new PopupWithForm (
  popupCardSelector,
  handleCardFormSubmit
);
popupCard.setEventListeners();

function handleCardFormSubmit(formData) {
  const {
    popupInputCardName: name,
    popupInputCardImage: link
  } = formData;
  popupCard.renderLoading(true);
  api.addNewCard({ name, link })
    .then((result) => {
      cards.addItem(getCard(result, userInfo.getUserInfo()));
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading(false);
    });
}

//Обработчики лайков, удаления карточки
function handleLikeCard(cardElement) {
  if (cardElement.checkUserLikes()) {
    api.deleteLikeApi(cardElement.getId())
      .then((res) => {
        cardElement.updateLikeState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.addLikeApi(cardElement.getId())
      .then((res) => {
        cardElement.updateLikeState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDeleteCard(cardElement) {
  api.deleteCardApi(cardElement.getId())
  .then(() => {
    cardElement.deleteCard();
  })
  .catch((err) => {
    console.log(err);
  });}

//Слушатели кнопок открывания попапов
avatarEditButton.addEventListener('click', () => {
  formValidators['form_avatar'].resetFormValidation();
  popupAvatar.open({});
});

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formValidators['form_profile'].resetFormValidation();
  popupProfile.open({ data: {
    popupInputProfileName: userData.name,
    popupInputProfileAbout: userData.description
  }});
});

openAddCardButton.addEventListener('click', () => {
  formValidators['form_cards'].resetFormValidation();
  popupCard.open({});
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
 enableValidation(validateSettings);
