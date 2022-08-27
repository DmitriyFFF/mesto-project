import { openPopup } from './modal.js';
export const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1571649425554-e94518844c37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1602923632045-d29f261735ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1607516100924-9a3f2c801cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1886&q=80'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1637579176819-36455abf2e97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
  ];

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
