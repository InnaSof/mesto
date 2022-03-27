export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//объект конфигураций валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled'
}

export const popupFormName = document.querySelector('#name-input');
export const popupFormJob = document.querySelector('#job-input');
export const formProfile = document.querySelector('[name="form-profile"]');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const formCard = document.querySelector('[name="form-card"]');
export const cardsList = document.querySelector('.elements__list');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupTypeCard = document.querySelector('.popup_type_card');
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__subtitle');
export const buttonEditForm = document.querySelector('.profile__edit-button');
