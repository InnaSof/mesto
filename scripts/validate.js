//объект конфигураций валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled'
}

// функция включения валидации всех форм
export function enableValidation(data) {
    const forms = [...document.querySelectorAll(data.formSelector)]
    forms.forEach(form => addFormListeners(form, data))
}

//функция обработки форм
function addFormListeners(form, config) {
    form.addEventListener('submit', handleSubmit)

    const inputs = [...form.querySelectorAll(config.inputSelector)]
    inputs.forEach(input => input.addEventListener('input', function () {
        handleFieldInput(form, input, config);
        setSubmitButtonState (form, config);
    }))

    setSubmitButtonState (form, config)
}

//функция отправки формы
function handleSubmit(evt) {
    evt.preventDefault();
}

//функция обработки поля формы
export function handleFieldInput(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

//функция показывает ошибку
function showError(form, input, config) {
    input.classList.add(config.inputErrorClass)

    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.classList.add(config.errorClass)

    errorElement.textContent = input.validationMessage;
}

//функция скрывает ошибку
export function hideError(form, input, config) {
    input.classList.remove(config.inputErrorClass)

    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = '';
}

//функция состояния кнопки отправки в зависимости от валидности формы
export function setSubmitButtonState (form, config) {
    const button = form.querySelector(config.submitButtonSelector)

    button.disabled = !form.checkValidity()
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}


enableValidation(validationConfig);
