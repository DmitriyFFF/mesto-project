import { openPopup } from './modal.js';
import { userId } from './index.js';
import { Popup } from './Popup.js';
import { cardTemplate, popupPhoto, popupImage, popupImageName } from '../utils/constants.js';

//Новый код

export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, addLike) {
    this._selector = templateSelector;
    this._title = data.name;
    this._imageLink = data.link;
    this._ownerId = data.owner.id;
    this._cardId = data.id;
    this._likes = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._addLike = addLike;
  };

  // Шаблон 1 карточки
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // Нужно ли обернуть (Проверка лайков пользователя)
  _checkUserLikes() {//Не используется
    if (this._likes.some((item) => item._id === this._ownerId)) {
      this._selector.querySelector('.card__button').classList.add('card__button_active');
    }
  }

  // Проверка принадлежит ли карточка пользователю
  _checkUserCardId(userId) {//Не используется
    if (this._ownerId === userId) {
      this._selector.querySelector('.card__delete-button').classList.remove('card__delete-button_disabled');
      this._selector.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(this._cardId, this._element);
      });
    } else {
      this._selector.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
    }
  }

  // Добавление лайка ??????????????????????????????? Передается как колбек в index.js
  _addLike(cardId, likesCounter, likesButton) {
    this._addLike(cardId) //Остановились здесь
      .then((res) => {
        toggleLikeButton(res, likesCounter, likesButton);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Снятие лайка
  _deleteLike(cardId, likesCounter, likesButton) {
    deleteLikeApi(cardId) //Остановились здесь
      .then((res) => {
        this._toggleLikeButton(res, likesCounter, likesButton);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление карточки
  _deleteCard(cardId, cardElement) {
    deleteCardApi(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _toggleLikeButton(result, likesCounter, likeButton) {
    likesCounter.textContent = result.likes.length;
    likeButton.classList.toggle('card__button_active');
  } //???

  // Общие слушатели
  _setEventListeners() {
    this._selector.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });

    this._selector.querySelector('.card__button').addEventListener('click', () => {
      if (cardLikeButton.classList.contains('card__button_active')) {
        this._deleteLike(this._cardId, this._likes, cardLikeButton);
      } else {
        this._addLike(this._cardId, this._likes, cardLikeButton);
      }
    });
  }

  // Заполненная разметка 1 карточки
  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._imageLink;
    this._element.querySelector('.card__place').textContent = this._title;
    this._element.querySelector('.card__like-counter').textContent = this._likes;
    this._element.querySelector('.card__image').alt = this._title;

    return this._element;
  }
}

// Старый код
//***Функция создания карточки из шаблона***//
export function createCard(link, name, likes, ownerId, [], cardId, addLike, deleteLike, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikesButton = cardElement.querySelector('.card__button');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__place').textContent = name;
  cardLikesCounter.textContent = likes.length;

  //Проверка поставленных пользователем лайков
  const hasUserId = likes.some(item => {
    return item._id == userId;
  })

  if (hasUserId) {
    cardLikesButton.classList.add('card__button_active');
  }

  cardLikesButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (cardLikesButton.classList.contains('card__button_active')) {
      deleteLike(cardId, cardLikesCounter, cardLikesButton);
    } else {
      addLike(cardId, cardLikesCounter, cardLikesButton);
    }
  });

  //Проверка и удаление карточки пользователя
  if (ownerId === userId) {
    cardDeleteButton.classList.remove('card__delete-button_disabled');
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardId, cardElement)
    });
  } else {
    cardDeleteButton.classList.add('card__delete-button_disabled');
  }

  //Открывание попапа с картинкой
  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImageName.textContent = name;
    popupImage.alt = name;

    openPopup(popupPhoto);
  });
  return cardElement;
}

//***Функция добавления карточки в DOM***//
export function addCard(container, element) {
  container.prepend(element);
}
