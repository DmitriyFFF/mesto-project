//import {popupList} from './variables';
import {closePopup} from './modal.js';

const popupList = document.querySelectorAll('.popup');

export function keyHandler (evt) {
  popupList.forEach(popupElement => {
    if(evt.key === 'Escape') {
      closePopup(popupElement);
    }
  });
}

export function overlayHandler (evt) {
  popupList.forEach(popupElement => {
    if((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('popup_opened'))) {
      closePopup(popupElement);
    }
  });
}

