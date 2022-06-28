//***Открывание и закрывание форм по кнопкам ***

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

  if ((userNameInput.value === '') || (aboutUserInput.value === '')) {
    alert('Заполните все поля');
  } else {
    profileName.textContent = userNameInput.value;
    profileDescription.textContent = aboutUserInput.value;
  }

  userNameInput.value = '';
  aboutUserInput.value = '';

  openAndClosePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

//***Добавление/удаление карточки***

const cardsGallery = document.querySelector('.elements__gallery');
const addCardBtn = document.querySelector('.form__button_create-card');
const cardDeleteBtn = cardsGallery.querySelector('.card__delete-button');

const initialCards = [
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

//Перебор массива карточек с добавлением/удалением лайков и открыванием попапа с картинкой каждой карточки
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

  if ((urlInput.value === '') || (placeNameInput.value === '')) {
    alert('Заполните все поля');
  } else {
    createCards(urlInput.value, placeNameInput.value);
    openImageForm(urlInput.value, placeNameInput.value);
  }

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
  });
}
