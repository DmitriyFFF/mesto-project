//import {cardTemplate, popupImage, popupImageName, popupPhoto} from './variables';
import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageName = popupPhoto.querySelector('.popup__image-name');

//***Функция переключения кнопки лайка***//
function toggleLikeButton(button) {
  button.addEventListener('click', evt => {
    evt.target.classList.toggle('card__button_active');
  });
}

//***Функция удаления карточки по кнопке***//
function deleteCardButton(button) {
  button.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
}

//***Функция создания карточки из шаблона***//
export function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__place').textContent = name;

  toggleLikeButton(cardElement.querySelector('.card__button'));

  deleteCardButton(cardElement.querySelector('.card__delete-button'));

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
