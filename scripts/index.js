import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-cards.js';

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
const formProfile = document.querySelector('[name="form-profile"]');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupTypeCard = document.querySelector('.popup_type_card');
const buttonCloseAddCard = popupTypeCard.querySelector('.popup__close-btn');
const popupFormCard = document.querySelector('.popup__container_card');
const inputCardName = document.querySelector('[name="card-name"]');
const inputCardLink = document.querySelector('[name="card_url"]');
const formCard = document.querySelector('[name="form-card"]');
const cardsList = document.querySelector('.elements__list');

const popupTypeImage = document.querySelector('.popup_type_image');
const buttonCloseFormImage = popupTypeImage.querySelector('.popup__close-btn');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

const validationCard = new FormValidator(validationConfig, formCard);
const validationProfile =new FormValidator(validationConfig, formProfile);

// Функция создания карточки
function newCard(name, link) {
    const card = new Card(name, link, '#element-template', openPopupImage);
    return card.createCard();
}

// метод перебирает массив, создает карточки и возвражает на страницу
initialCards.forEach((item) => {
  cardsList.prepend(newCard(item.name, item.link));
});

//функция открытия popap
function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keydown', pressEscape);
}

//функция открытия popup изображения
function openPopupImage(name, link) {
  openPopup(popupTypeImage);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
}

// функция открытия popup создания новой карточки
function openPopupCard() {
  openPopup(popupTypeCard);
  formCard.reset();
  validationCard.resetFormValidation();
}

//функция открытия папап редактирования профиля
function openPopupProfile() {
  openPopup(popupTypeEdit);
  popupFormName.value = nameInput.textContent;
  popupFormJob.value = jobInput.textContent;
  validationProfile.resetFormValidation();
}

//функция отправки формы создания карточек
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const element = {
    name: inputCardName.value,
    link: inputCardLink.value
  }

  cardsList.prepend(newCard(element.name, element.link));
  closePopup(popupTypeCard);
}

// функция меняет данные на сайте, в соответвии с вносимыми данными в форму popup
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = popupFormName.value;
  jobInput.textContent = popupFormJob.value;
  closePopup(popupTypeEdit);
}

//функция закрытия popap
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


//включение валидации
validationProfile.enableValidation();
validationCard.enableValidation();

//слушатель клика открытия попапа
buttonAddCard.addEventListener('click', openPopupCard);
buttonEditForm.addEventListener('click', openPopupProfile);

//слушатель клика закрытия попапа
buttonCloseFormImage.addEventListener('click', () => closePopup(popupTypeImage));
buttonCloseAddCard.addEventListener('click', () => closePopup(popupTypeCard));
buttonCloseEditForm.addEventListener('click', () => closePopup(popupTypeEdit));

//слушатель отправки формы
popupProfileForm.addEventListener('submit', handleEditProfileSubmit);
popupFormCard.addEventListener('submit', handleAddCardSubmit);

//слушатель клика overlay
popupTypeImage.addEventListener('click', clickOverlay);
popupTypeCard.addEventListener('click', clickOverlay);
popupTypeEdit.addEventListener('click', clickOverlay);
