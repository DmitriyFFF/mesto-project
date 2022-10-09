/*import { openPopup } from './modal.js';
import { userId } from './index.js';
import { Popup } from './Popup.js';
import { cardTemplate, popupPhoto, popupImage, popupImageName } from '../utils/constants.js';*/

//Новый код

export default class Card {
  constructor(data, templateSelector, userData, handleCardClick, handleLikeCard, handleDeleteCard, userId) {
    this._data = data;
    this._selector = templateSelector;
    this._userData = userData;
    //this._renderer = renderer;
    this._title = data.name;
    this._imageLink = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    // this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
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
    if (this._data.likes.some((like) => like._id === this._ownerId)) {
      return true;}
      else {
      return false;}
  }
  
  // Проверка принадлежит ли карточка пользователю
  _checkUserCardId(data) {
    if (this._ownerId === this._userData._id) {
      this._deleteButton.classList.remove('card__delete-button_disabled');
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteCard(data);
      });
    } else {
      this._deleteButton.classList.add('card__delete-button_disabled');
    }
  }

  // Добавление лайка
  _addLike() {
    this._likeButton.classList.add('card__button_active');
  }

  // Снятие лайка
  _deleteLike() {
    this._likeButton.classList.remove('card__button_active');
  }

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
  }

  _updateLikeState(data) {
    this._data = data;
    this._likeCounter.textContent = this._data.likes.length || 0;
    if (this._checkUserLikes()) {
      this._addLike();
    } else {
      this._deleteLike();
    }
  }

  // Общие слушатели
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._title, this._imageLink);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
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

    this._checkUserCardId(this);
    this._image.src = this._imageLink;
    this._image.alt = this._title;
    this._name.textContent = this._title;
    this._updateLikeState(this._data);


    this._setEventListeners();
    return this._element;
  }
}