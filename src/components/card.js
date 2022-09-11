import { openPopup } from './modal.js';
import { myId } from './index.js';
import { deleteCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageName = popupPhoto.querySelector('.popup__image-name');

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
  const hasMyId = likes.some(item => {
    return item._id == myId;
  })
  if (hasMyId) {
    cardLikesButton.classList.add('card__button_active');
  }

  cardLikesButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (cardLikesButton.classList.contains('card__button_active')) {
      deleteLike(cardId, cardLikesCounter);
      cardLikesButton.classList.remove('card__button_active');
    } else {
      addLike(cardId, cardLikesCounter);
      cardLikesButton.classList.add('card__button_active');
    }
  });

  //Проверка и удаление карточки пользователя
  if (ownerId === myId) {
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
