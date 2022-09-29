import {closePopup} from '../components/modal.js';

export function handleEscapeKey (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

export function handleClosePopupOverlay (evt) {
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

/*перенес в api.js
export function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}*/

export function toggleLikeButton(result, likesCounter, likeButton) {
  likesCounter.textContent = result.likes.length;
  likeButton.classList.toggle('card__button_active');
}
