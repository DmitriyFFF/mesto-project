//***Открытие и закрытие форм по кнопкам ***

const popupProfile = document.querySelector('.popup_profile');
const popupGallery = document.querySelector('.popup_gallery');
const openProfileBtn = document.querySelector('.profile__edit-button');
const openAddCardBtn = document.querySelector('.profile__add-card-button');
const closeProfileBtn = popupProfile.querySelector('.form__close');
const closeAddCardBtn = popupGallery.querySelector('.form__close');

function openAndClosePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

openProfileBtn.addEventListener('click', () => {
  openAndClosePopup(popupProfile);
});

closeProfileBtn.addEventListener('click', () => {
  openAndClosePopup(popupProfile);
});

openAddCardBtn.addEventListener('click', () => {
  openAndClosePopup(popupGallery);
});

closeAddCardBtn.addEventListener('click', () => {
  openAndClosePopup(popupGallery);
});

const popupPhoto = document.querySelector('.popup__view-photo');
const closePhotoBtn = popupPhoto.querySelector('.form__close');
closePhotoBtn.addEventListener('click', () => {
  openAndClosePopup(popupPhoto);
});

//***Сохранение информации о пользователе из полей формы***

const formElement = document.querySelector('.form__profile');
const userNameInput = formElement.querySelector('.form__item_name');
const aboutUserInput = formElement.querySelector('.form__item_about');

function formSubmitHandler (evt) {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  userNameInput.value = '';
  aboutUserInput.value = '';

  openAndClosePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

//***Добавляем/удаляем карточки и ставим лайки***

const cardsGallery = document.querySelector('.elements__gallery');
const addCardBtn = document.querySelector('.form__button_create-card');
const cardDeleteBtn = cardsGallery.querySelector('.card__delete-button');

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1571649425554-e94518844c37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFpa2FsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1602923632045-d29f261735ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJ1c3NpYSUyMG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1607516100924-9a3f2c801cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHJ1c3NpYSUyMG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1568028476727-0c86534220fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cnVzc2lhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cnVzc2lhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1456426143385-2d6ae5764c6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHJ1c3NpYSUyMG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }
  ];

//Перебор массива карточек с добавлением/удалением лайков и открытием попапа с картинкой каждой карточки
for (let i = 0; i < initialCards.length; i++) {
  cardsGallery.querySelectorAll('.card__image')[i].src = initialCards[i].link;
  cardsGallery.querySelectorAll('.card__place')[i].textContent= initialCards[i].name;

  cardsGallery.querySelectorAll('.card__button')[i].addEventListener('click', (evt) => {
   evt.target.classList.toggle('card__button_active')
  });

  cardsGallery.querySelectorAll('.card__image')[i].addEventListener('click', () => {
    popupPhoto.classList.add('popup_opened');
    popupPhoto.querySelector('.form__image').src = initialCards[i].link;
    popupPhoto.querySelector('.form__name-image').textContent = initialCards[i].name;
  });
}
removeCards();

//Добавление новой карточки по кнопке формы
addCardBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  const urlInput = document.querySelector('.form__item_url');
  const placeNameInput = document.querySelector('.form__item_place');

  createCards(urlInput.value, placeNameInput.value);

  openImageForm(urlInput.value, placeNameInput.value);

  removeCards();
  urlInput.value = '';
  placeNameInput.value = '';

  openAndClosePopup(popupGallery);
});

//Функция создания карточки из шаблона
function createCards(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__place').textContent = name;
  cardElement.querySelector('.card__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__button_active')
  });

  cardsGallery.prepend(cardElement);
}

//Функция удаления карточки по кнопке
function removeCards() {
  const cardDeleteBtn = cardsGallery.querySelectorAll('.card__delete-button');
  for (let i = 0; i < cardDeleteBtn.length; i++) {
    cardDeleteBtn[i].addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
    });
  };
}

//Функция открытия попапа с картинкой
function openImageForm(linkPlace, namePlace) {
  const cardImage = cardsGallery.querySelector('.card__image');
  const formImage = popupPhoto.querySelector('.form__image');
  const nameImage = popupPhoto.querySelector('.form__name-image');

  cardImage.addEventListener('click', () => {
    popupPhoto.classList.add('popup_opened');
    formImage.src = linkPlace;
    nameImage.textContent = namePlace;
    console.log('Нажал');
  });
}

//Функция добавления/удаления лайка
/*function addLike() {
  const likeBtn = cardsGallery.querySelectorAll('.card__button');
  for (let i = 0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__button_active')
    });
  };
}*/


//addLike();


//лайк карточек доделать

//const addCardBtn = popupGallery.querySelector('.form__button_create-card');
/*const formCards = document.querySelector('.form__cards');
const placeNameInput = formCards.querySelector('.form__item_place');
const urlInput = formCards.querySelector('.form__item_url');

function cardsSubmitHandler() {
  const cardPlace = cardsGallery.querySelector('.card__place');
  const cardUrl = cardsGallery.querySelector('.card__image');

  cardPlace.value = placeNameInput.textContent;
  cardUrl.src = urlInput.textContent;

  createCards(cardPlace.value, cardUrl.src);

  openAndClosePopup(popupGallery);

  placeNameInput.value = '';
  urlInput.value = '';
};*/

//formCards.addEventListener('submit', cardsSubmitHandler);


/*
function addCards(cardContainer, cardElement) {
  cardContainer.prepend(cardElement);
}

addCards(cardsGallery, createCard(cardElement.link, cardElement.name));

const placeElement = document.querySelector('.form__cards')

*******************отдельно создание и добавление*/


/*function cardCreateHandler (evt) {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  openAndClosePopup(popupGallery);
}*/


/*cardElement.querySelector('.card__like')/*???*/
  /*cardElement.querySelector('.card__like').addEventListener('click', function(event) {
    event.target.classList.toggle('.card__button_active');
  });*/






