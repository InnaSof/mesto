import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const initialCards = [
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
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled'
}

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupOpenedClass = 'popup_opened';
const popupProfileForm = popupTypeEdit.querySelector('.popup__container');
const buttonEditForm = document.querySelector('.profile__edit-button');
const buttonCloseEditForm = popupTypeEdit.querySelector('.popup__close-btn');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const popupFormName = document.querySelector('#name-input');
const popupFormJob = document.querySelector('#job-input');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupTypeCard = document.querySelector('.popup_type_card');
const buttonCloseAddCard = popupTypeCard.querySelector('.popup__close-btn');
const popupFormCard = document.querySelector('.popup__container_card');
const inputCardName = document.querySelector('[name="card-name"]');
const inputCardLink = document.querySelector('[name="card_url"]');

const popupTypeImage = document.querySelector('.popup_type_image');
const buttonCloseFormImage = popupTypeImage.querySelector('.popup__close-btn');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

const cardsList = document.querySelector('.elements__list');

const forms = [...document.querySelectorAll(validationConfig.formSelector)];
const formCard = document.querySelector('[name="form-card"]');
const formProfile = document.querySelector('[name="form-profile"]');


initialCards.forEach((item) => {
    const card = new Card(item, '#element-template', seePopupImage);
    cardsList.prepend(card.createCard());
});

function seePopupImage(name, link) {
    openPopup(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
}

//функция отправки формы создания карточек
const handleAddCardSubmit = (evt) => {
    evt.preventDefault();

    const element = {
        name: inputCardName.value,
        link: inputCardLink.value
    }

    const newCard = new Card(element, '#element-template', seePopupImage)
    cardsList.prepend(newCard.createCard());

    closePopup(popupTypeCard);
}

//функция открытия попап
function openPopup(popup) {
    popup.classList.add(popupOpenedClass);
    document.addEventListener('keydown', pressEscape);
    
    forms.forEach(function () {
      const formValidator = new FormValidator(validationConfig, formCard);
      formValidator.enableValidation();
    });
}

//функция открытия папап редактирования профиля
function openPopupProfile() {
    openPopup(popupTypeEdit);
    popupFormName.value = nameInput.textContent;
    popupFormJob.value = jobInput.textContent;
    
    forms.forEach(function () {
      const formValidator = new FormValidator(validationConfig, formProfile);
      formValidator.enableValidation();
    });
}

//функция закрытия попап
function closePopup(popup) {
    popup.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', pressEscape);
}

//функция нажатия escape
function pressEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

//функция нажатия overlay
function clickOverlay(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target === openedPopup) {
        closePopup(openedPopup);
    }
}

// функция меняет данные на сайте, в соответвии с вносимыми данными в форму попап
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    nameInput.textContent = popupFormName.value;
    jobInput.textContent = popupFormJob.value;
    closePopup(popupTypeEdit);
}

// //слушатель клика открытия попапа редактирования профайла
buttonEditForm.addEventListener('click', () => {
    openPopupProfile();
});

//слушатель клика закрытия попапа редактирования профайла
buttonCloseEditForm.addEventListener('click', () => closePopup(popupTypeEdit));

popupProfileForm.addEventListener('submit', handleEditProfileSubmit);
popupTypeEdit.addEventListener('click', clickOverlay);

//слушатель клика открытия попапа карточки
buttonAddCard.addEventListener('click', () => {
    openPopup(popupTypeCard);
    formCard.reset();
});

//слушатель клика закрытия попапа карточки
buttonCloseAddCard.addEventListener('click', () => closePopup(popupTypeCard));

popupFormCard.addEventListener('submit', handleAddCardSubmit);
popupTypeCard.addEventListener('click', clickOverlay);

//слушатель клика закрытия попапа изображения
buttonCloseFormImage.addEventListener('click', () => closePopup(popupTypeImage));
popupTypeImage.addEventListener('click', clickOverlay);
