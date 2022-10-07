/*import { openPopup } from './modal.js';
import { userId } from './index.js';
import { Popup } from './Popup.js';
import { cardTemplate, popupPhoto, popupImage, popupImageName } from '../utils/constants.js';*/

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
    this._likesCounter = likesCounter;
    this._cardLikeButton = this._selector.querySelector('.card__button');
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
      this._cardLikeButton.classList.add('card__button_active');
    }
  }

  // Проверка принадлежит ли карточка пользователю
  _checkUserCardId() {//Не используется
    if (this._ownerId === this._userId) {
      this._selector.querySelector('.card__delete-button').classList.remove('card__delete-button_disabled');
      this._selector.querySelector('.card__delete-button').addEventListener('click', () => {
        this._deleteCard();
      });
    } else {
      this._selector.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
    }
  }

  _toggleLikeButton() {
    this._likesCounter.textContent = this._likes;
    this._cardLikeButton.classList.toggle('card__button_active');
  } //???

  // Добавление лайка ??????????????????????????????? Передается как колбек в index.js
  _addLike() {
    //this._addLike(cardId) //Остановились здесь
    this._toggleLikeButton();
  }

  // Снятие лайка
  _deleteLike() {
    //deleteLikeApi(cardId) //Остановились здесь
    this._toggleLikeButton();
  }

  // Удаление карточки
  _deleteCard() {
    //deleteCardApi(cardId)
    //this._getElement.remove();
    this._cardElement.remove();
  }

  // Общие слушатели
  _setEventListeners() {
    this._selector.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardLikeButton.addEventListener('click', () => {
      if (this._cardLikeButton.classList.contains('card__button_active')) {
        this._deleteLike();
      } else {
        this._addLike();
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

    this._checkUserCardId();
    this._checkUserLikes();

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
