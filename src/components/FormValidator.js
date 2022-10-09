//import {validateSettings} from '../utils/constants.js';

export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;//???
    this._element = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));//this._inputList???
    this._buttonElement = this._element.querySelector(this._submitButtonSelector);//this._buttonElement???
  }

  //***Функция, показывающая сообщение ошибки поля***//
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //***Функция, скрывающая сообщение ошибки поля***//
  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //***Функция проверки поля на валидность***//
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //***Функция, добавляющая обработчики полям формы***//
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //***Функция проверки наличия невалидного поля***//
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {//this._inputList???
      return !inputElement.validity.valid;
    })
  }

  //***Функция переключения состояния кнопки***//
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled',true);
    } else {
      this._buttonElement.removeAttribute('disabled');
    }
  }

  resetFormValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //***Функция, добавляющая обработчики всем формам***//
  enableValidation() {
    this._setEventListeners();
  }
}

// Старый код
//***Функция, показывающая сообщение ошибки поля***//
/* function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//***Функция, скрывающая сообщение ошибки поля
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//***Функция проверки поля на валидность
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateSettings.inputErrorClass,validateSettings.errorClass);
  } else {
    hideInputError(formElement, inputElement, validateSettings.inputErrorClass,validateSettings.errorClass);
  }
}

//***Функция, добавляющая обработчики полям формы
function setEventListeners(formElement, inputSelector, submitButtonSelector) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector)

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//***Функция проверки наличия невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//***Функция переключения состояния кнопки
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled',true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

//***Функция, добавляющая обработчики всем формам
export function enableValidation(validateSettings) {
  const formList = document.querySelectorAll(validateSettings.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, validateSettings.inputSelector, validateSettings.submitButtonSelector);
  });
}
 */
