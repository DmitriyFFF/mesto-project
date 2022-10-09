/*import { openPopup } from './modal.js';
import { userId } from './index.js';
import { Popup } from './Popup.js';
import { cardTemplate, popupPhoto, popupImage, popupImageName } from '../utils/constants.js';*/

//Новый код

export default class Card {
  constructor(data, templateSelector, /*renderer,*/ handleCardClick, handleLikeCard, handleDeleteCard, userId) {
    this._selector = templateSelector;
    //this._renderer = renderer;
    this._title = data.name;
    this._imageLink = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handdleDeleteCard = handleDeleteCard;
    /*this._likesCounter = likesCounter;
    this._cardLikeButton = this._selector.querySelector('.card__button');
    this._cardDeleteButton = this._selector.querySelector('.card__delete-button');*/
  }

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
  _checkUserLikes() {
    if (this._likes.some((item) => item._id === this._ownerId)) {
      return true;}
      else {
      return false;}
  }
  
  // Проверка принадлежит ли карточка пользователю
  /*_checkUserCardId(data) {
    if (this._ownerId === this._userId) {
      this._selector.querySelector('.card__delete-button').classList.remove('card__delete-button_disabled');
      this._selector.querySelector('.card__delete-button').addEventListener('click', () => {
        this._handleDeleteCard(data);
      });
    } else {
      this._selector.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
    }
  }*/

  /*_toggleLikeButton() {
    this._likesCounter.textContent = this._likes;
    this._cardLikeButton.classList.toggle('card__button_active');
  } //???*/

  // Добавление лайка ??????????????????????????????? Передается как колбек в index.js
  _addLike(likes) {
    this._likeButton.classList.add('card__button_active');
    this._likeCounter.textContent = likes;
  }

  // Снятие лайка
  _deleteLike(likes) {
    this._likeButton.classList.remove('card__button_active');
    this._likeCounter.textContent = likes;
  }

  // Удаление карточки
  deleteCard() {
    this._cardElement.remove();
  }

  // Общие слушатели
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._title, this._imageLink);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handdleDeleteCard(this);
    });
  }

  // Заполненная разметка 1 карточки
  generate() {
    this._element = this._getElement();

    this._image = this._element.querySelector('.card__image');
    this._name = this._element.querySelector('.card__place') ;
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__button');

    this._image.src = this._imageLink;
    this._image.alt = this._title;
    this._name.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();
    return this._element;
  }
}

// Старый код
//***Функция создания карточки из шаблона***//
/* export function createCard(link, name, likes, ownerId, [], cardId, addLike, deleteLike, deleteCard) {
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

//Функция добавления карточки в DOM
export function addCard(container, element) {
  container.prepend(element);
} */
