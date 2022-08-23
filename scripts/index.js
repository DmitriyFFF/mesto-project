
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
const userNameInput = formProfile.querySelector('.form__input_type_name');
const aboutUserInput = formProfile.querySelector('.form__input_type_about');
const urlInput = formCards.querySelector('.form__input_type_url');
const namePlaceInput = formCards.querySelector('.form__input_type_place');

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



//***Валидация форм***//

//***Функция, показывающая сообщение ошибки поля***//
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

//***Функция, скрывающая сообщение ошибки поля***//
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

//***Функция проверки поля на валидность***//
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//***Функция, добавляющая обработчики полям формы***//
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button')

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//***Функция, добавляющая обработчики всем формам***//
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

//***Функция проверки наличия невалидного поля***//
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//***Функция переключения состояния кнопки***//
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled',true);
  } else {
    buttonElement.removeAttribute('disabled', false);
  }
}

enableValidation();



