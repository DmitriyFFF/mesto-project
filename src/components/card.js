import { openPopup } from './modal.js';
import { userId } from './index.js';

//Новый импорт
import { cardTemplate, popupPhoto, popupImage, popupImageName } from '../utils/constants.js';

class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._selector = templateSelector;
    this._title = data.name;
    this._imageLink = data.link;
    this._ownerId = data.owner.id;
    this._cardId = data.id;
    this._likes = data.likes.length;
  };

  createCard() {
    this._selector.querySelector('.card__place').textContent = this._title;
    this._selector.querySelector('.card__image').src = this._imageLink;
    this._selector.querySelector('.card__image').alt = this._title;
    this._selector.querySelector('.card__like-counter').textContent = this._likes;

    if (this._likes.some((item) => item._id === this._ownerId)) {
      cardLikeButton.classList.add("card__button_active");
    }
  
    cardLikeButton = this._selector.querySelector('.card__button');

    export function deleteLike(cardId, likesCounter, likesButton) {
      deleteLikeApi(cardId)
        .then((res) => {
          toggleLikeButton(res, likesCounter, likesButton);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    

    cardLikeButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (cardLikeButton.classList.contains('card__button_active')) {
        Api.deleteLikeApi(addLikeApi);
      } else {
        Api.addLikeApi(cardId, cardLikesCounter, cardLikesButton);
      }
    });
  }
};

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
