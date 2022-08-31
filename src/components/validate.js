export const validateSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//***Функция, показывающая сообщение ошибки поля***//
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//***Функция, скрывающая сообщение ошибки поля***//
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//***Функция проверки поля на валидность***//
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

//***Функция, добавляющая обработчики полям формы***//
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

//***Функция проверки наличия невалидного поля***//
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//***Функция переключения состояния кнопки***//
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled',true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

//***Функция, добавляющая обработчики всем формам***//
export function enableValidation(validateSettings) {
  const formList = document.querySelectorAll(validateSettings.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, validateSettings.inputSelector, validateSettings.submitButtonSelector);
  });
}
