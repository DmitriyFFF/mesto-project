import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super (selector);
    this._handleSubmitForm = handleSubmitForm;
    //this._formElement = this._popupSelector.querySelector('.form');
  }

  _getInputValues() {//из тренажера
    // достаём все элементы полей
    this._inputList = this._element.querySelectorAll('.form__input');//???

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    /*this._formElement.reset();*/
  }
}
