//Открывание и закрывание по кнопкам формы регистрации

const popup = document.querySelector('.popup');
const openProfileBtn = document.querySelector('.profile__edit-button');
const closeProfileBtn = popup.querySelector('.form__close');

openProfileBtn.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

closeProfileBtn.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

//Сохранение информации о пользователе из полей формы


const submitProfileBtn = popup.querySelector('.form__button');
//console.log(userNameInput.getAttribute('value'));

function formSubmitHandler (evt) {
  evt.preventDefault();

  let userNameInput = popup.querySelector('.form__item_name');
  let aboutUserInput = popup.querySelector('.form__item_about');

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = userNameInput.value;
  profileDescription.textContent = aboutUserInput.value;

  return;
}

submitProfileBtn.addEventListener('submit', formSubmitHandler);



//console.log(userNameInput.value);


