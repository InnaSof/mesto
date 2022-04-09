import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, form) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = form;
    this._popupButton = this._form.querySelector('.popup__submit-btn');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._popupButtonTextContent = this._popupButton.textContent;
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


  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }
}

