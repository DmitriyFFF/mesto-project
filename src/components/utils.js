import {closePopup} from './modal.js';

export function keyHandler (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

export function overlayHandler (evt) {
  if((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('popup_opened'))) {
    closePopup(evt.currentTarget);
  }
}

export function renderLoading(button, textButton, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = textButton;
  }
}
