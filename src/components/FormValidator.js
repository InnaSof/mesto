export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
  }

  //метод показывает ошибку
  _showError(input) {
    input.classList.add(this._config.inputErrorClass);

    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.classList.add(this._config.errorClass);

    errorElement.textContent = input.validationMessage;
  }

  //метод скрывает ошибку
  _hideError(input) {
    input.classList.remove(this._config.inputErrorClass);

    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(this._config.errorClass);

    errorElement.textContent = '';
  }

  //метод обработки поля формы
  _handleFieldInput(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  //метод состояния кнопки отправки в зависимости от валидности формы
  _setSubmitButtonState() {
    this._button.disabled = !this._form.checkValidity()
    this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity())
  }

  //метод отправки формы
  _handleSubmit(evt) {
    evt.preventDefault();
  }

//метод обработки форм
  _setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit);
    this._setSubmitButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleFieldInput(input);
        this._setSubmitButtonState();
      });
    });
  }

  resetFormValidation() {
    this._button.classList.add(this._config.inactiveButtonClass); 
    this._setSubmitButtonState();

    this._inputs.forEach((input) => { 
      this._hideError(input)
    });
  }
  
// функция включения валидации всех форм
  enableValidation() {
    this._setEventListeners();
  }
}
