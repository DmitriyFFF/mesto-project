
const popupProfile = document.querySelector('.popup_type_profile');
const popupGallery = document.querySelector('.popup_type_gallery');
const popupPhoto = document.querySelector('.popup_type_photo');
const openProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-card-button');
const closeProfileButton = popupProfile.querySelector('.popup__close');
const closeAddCardButton = popupGallery.querySelector('.popup__close');
const closePhotoButton = popupPhoto.querySelector('.popup__close');
const cardsGallery = document.querySelector('.elements__gallery');
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageName = popupPhoto.querySelector('.popup__image-name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfile = document.querySelector('.form_type_profile');
const formCards = document.querySelector('.form_type_cards');
const userNameInput = formProfile.querySelector('.form__item_input_name');
const aboutUserInput = formProfile.querySelector('.form__item_input_about');
const urlInput = formCards.querySelector('.form__item_input_url');
const namePlaceInput = formCards.querySelector('.form__item_input_place');

//***Функции открывания и закрывания форм по кнопкам ***//

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

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

function createCard(link, name) {
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

function addCard(container, element) {
  container.prepend(element);
}

//***Функция сохранения информации о пользователе из формы***//

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  closePopup(popupProfile);
}

//***Функция добавления новой карточки из формы***//

function handleCardFormSubmit (evt) {
  evt.preventDefault();

  addCard(cardsGallery, createCard(urlInput.value, namePlaceInput.value));

  formCards.reset();

  closePopup(popupGallery);
}

//***Обработка отправки форм***//

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);

//***Открывание/закрывание попапов***//

openProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  userNameInput.value = profileName.textContent;
  aboutUserInput.value = profileDescription.textContent;
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

//***Создание карточек из массива данных***//

initialCards.forEach(function(item){
  addCard(cardsGallery, createCard(item.link, item.name));
});
