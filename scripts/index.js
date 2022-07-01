
const popupProfile = document.querySelector('.popup_type_profile');
const popupGallery = document.querySelector('.popup_type_gallery');
const popupPhoto = document.querySelector('.popup_type_photo');

const openProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-card-button');
const closeProfileButton = popupProfile.querySelector('.popup__close');
const closeAddCardButton = popupGallery.querySelector('.popup__close');
const closePhotoButton = popupPhoto.querySelector('.popup__close');

const cardTemplate = document.querySelector('#card-template').content;
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageName = popupPhoto.querySelector('.popup__image-name');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const cardsGallery = document.querySelector('.elements__gallery');

const formProfile = document.querySelector('.form_type_profile');
const userNameInput = formProfile.querySelector('.form__item_input_name');
const aboutUserInput = formProfile.querySelector('.form__item_input_about');
const formCards = document.querySelector('.form_type_cards');
const urlInput = formCards.querySelector('.form__item_input_url');
const namePlaceInput = formCards.querySelector('.form__item_input_place');

/*document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('click', evt => {
    alert(evt.target.textContent);
  })
})*/

//***Открывание и закрывание форм по кнопкам ***

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

openProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

openAddCardButton.addEventListener('click', () => {
  openPopup(popupGallery);
});

closeProfileButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

closeAddCardButton.addEventListener('click', () => {
  closePopup(popupGallery);
});

closePhotoButton.addEventListener('click', () => {
  closePopup(popupPhoto);
});

//***Функция создания карточки из шаблона***
function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__place').textContent = name;
  cardElement.querySelector('.card__image').alt = name;

  //Переключение кнопки лайка
  cardElement.querySelector('.card__button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__button_active')
  });

  //Удаление карточки по кнопке
  cardElement.querySelectorAll('.card__delete-button').forEach(item => {
    item.addEventListener('click', evt => {
      evt.target.closest('.card').remove();
    })
  })

  //Открывание попапа с картинкой
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openPopup(popupPhoto);
    popupImage.src = link;
    popupImageName.textContent = name;
    popupImage.alt = name;
  });

  cardsGallery.prepend(cardElement);
}

//***Сохранение информации о пользователе из полей формы***

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);

//Создание карточек из массива данных
initialCards.forEach(function(item){
  createCard(item.link, item.name);
  //openImageForm(item.link, item.name);
  //removeCards();
});

//Добавление новой карточки из формы
function handleCardFormSubmit (evt) {
  evt.preventDefault();

  createCard(urlInput.value, namePlaceInput.value);
  closePopup(popupGallery);
}

formCards.addEventListener('submit', handleCardFormSubmit);


/*addCardButton.addEventListener('click', evt => {
  evt.preventDefault();

  if ((urlInput.value === '') || (namePlaceInput.value === '')) {
    alert('Заполните все поля');
  } else {
    createCard(urlInput.value, namePlaceInput.value);
    //openImageForm(urlInput.value, namePlaceInput.value);
  }

  //removeCards();

  urlInput.value = '';
  namePlaceInput.value = '';

  closePopup(popupGallery);
});*/


