import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, form) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = form;
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
      this.close()
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}

