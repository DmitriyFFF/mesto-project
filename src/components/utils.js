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

export function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function toggleLikeButtom(result, likesCounter, likeButton, likeStatus) {
  likesCounter.textContent = result.likes.length
  if (!likeStatus) {
    likeButton.classList.remove('card__button_active');
  } else {
    likeButton.classList.add('card__button_active');
  }
}
