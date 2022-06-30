//***Открывание и закрывание форм по кнопкам ***

const popupProfile = document.querySelector('.popup_type_profile');
const popupGallery = document.querySelector('.popup_type_gallery');
const popupPhoto = document.querySelector('.popup_type_photo');
const openProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-card-button');
const closeProfileButton = popupProfile.querySelector('.popup__close');
const closeAddCardButton = popupGallery.querySelector('.popup__close');
const closePhotoButton = popupPhoto.querySelector('.popup__close');

function openAndClosePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

openProfileButton.addEventListener('click', () => {
  openAndClosePopup(popupProfile);
});

closeProfileButton.addEventListener('click', () => {
  openAndClosePopup(popupProfile);
});

openAddCardButton.addEventListener('click', () => {
  openAndClosePopup(popupGallery);
});

closeAddCardButton.addEventListener('click', () => {
  openAndClosePopup(popupGallery);
});

closePhotoButton.addEventListener('click', () => {
  openAndClosePopup(popupPhoto);
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
  const cardDeleteButton = cardsGallery.querySelectorAll('.card__delete-button');
  for (let i = 0; i < cardDeleteButton.length; i++) {
    cardDeleteButton[i].addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
    });
  }
}

//Функция открытия попапа с картинкой
function openImageForm(linkPlace, namePlace) {
  const cardImage = document.querySelector('.card__image');
  const popupImage = popupPhoto.querySelector('.popup__image');
  const popupImageName = popupPhoto.querySelector('.popup__image-name');

  cardImage.addEventListener('click', () => {
    openAndClosePopup(popupPhoto);
    popupImage.src = linkPlace;
    popupImageName.textContent = namePlace;
  });
}

//***Сохранение информации о пользователе из полей формы***

const formProfile = document.querySelector('.form_type_profile');
const userNameInput = formProfile.querySelector('.form_input_name');
const aboutUserInput = formProfile.querySelector('.form_input_about');

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

formProfile.addEventListener('submit', formSubmitHandler);

//***Добавление/удаление карточки***

const cardsGallery = document.querySelector('.elements__gallery');
const addCardButton = document.querySelector('.form_button_create-card');
const cardDeleteButton = cardsGallery.querySelector('.card__delete-button');

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
initialCards.forEach(function(item){
  createCards(item.link, item.name);
  openImageForm(item.link, item.name);
  removeCards();
});

//Добавление новой карточки по кнопке формы
const formCards = document.querySelector('.form_type_cards');
const urlInput = formCards.querySelector('.form_input_url');
const namePlaceInput = formCards.querySelector('.form_input_place');

addCardButton.addEventListener('click', function (evt) {
  evt.preventDefault();

  if ((urlInput.value === '') || (namePlaceInput.value === '')) {
    alert('Заполните все поля');
  } else {
    createCards(urlInput.value, namePlaceInput.value);
    openImageForm(urlInput.value, namePlaceInput.value);
  }

  removeCards();

  urlInput.value = '';
  namePlaceInput.value = '';

  openAndClosePopup(popupGallery);
});
