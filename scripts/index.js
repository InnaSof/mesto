import { initialCards } from './initial-cards.js';
import { enableValidation, validationConfig, setSubmitButtonState, handleFieldInput, hideError } from './validate.js';

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

const cardsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template')
    .content.querySelector('.element');
const buttonAddForm = document.querySelector('.profile__add-button');
const popupTypeCard = document.querySelector('.popup_type_card');
const buttonCloseAddForm = popupTypeCard.querySelector('.popup__close-btn');
const popupFormCard = document.querySelector('.popup__container_card');
const inputCardName = document.querySelector('[name="card-name"]');
const inputCardLink = document.querySelector('[name="card_url"]');
const formCard = document.querySelector('[name="form-card"]');

const popupTypeImage = document.querySelector('.popup_type_image');
const buttonCloseFormImage = popupTypeImage.querySelector('.popup__close-btn');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupImageCard = document.querySelector('.popup__image-card');

const inputsProfile = [...formProfile.querySelectorAll('.popup__input')];
const inputsCard = [...formCard.querySelectorAll('.popup__input')];

//функция создания элемента
const createCard = (item) => {
    const element = elementTemplate.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementImage = element.querySelector('.element__image');
    const buttonLikeElement = element.querySelector('.element__like-button');
    const buttonDeleteElement = element.querySelector('.element__delete-button');

    buttonLikeElement.addEventListener('click', handleLikeButton);
    buttonDeleteElement.addEventListener('click', handleDeleteButton);

    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;

    //функция просмотра изображения попап
    function seePopupImage() {
        openPopup(popupTypeImage);
        popupImage.src = elementImage.src;
        popupImage.alt = elementImage.alt;
        popupImageName.textContent = elementTitle.textContent;
    }

    elementImage.addEventListener('click', seePopupImage);

    return element;
};

//функция добавляет созданный элемент
const addElement = (item) => {
    const element = createCard(item);
    cardsList.prepend(element);
}

//функция перебирает массив и добавляет элементы из массива в карточку
initialCards.forEach(item => {
    addElement(item)
});

//функция меняет сердечко при нажатии like
function handleLikeButton(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

//функция удаления карточки
function handleDeleteButton(evt) {
    evt.target.closest('.element').remove();
}

//функция отправки формы создания карточек
const handleAddCardSubmit = (evt) => {
    evt.preventDefault();

    const element = {
        name: inputCardName.value,
        link: inputCardLink.value
    }
    addElement(element);
    closePopup(popupTypeCard);
}

//функция открытия попап
function openPopup(popup) {
    popup.classList.add(popupOpenedClass);
    document.addEventListener('keydown', pressEscape);
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
};

//функция открытия папап редактирования профиля
function openPopupProfile() {
    openPopup(popupTypeEdit);
    popupFormName.value = nameInput.textContent;
    popupFormJob.value = jobInput.textContent;
}

// функция меняет данные на сайте, в соответвии с вносимыми данными в форму попап
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    nameInput.textContent = popupFormName.value;
    jobInput.textContent = popupFormJob.value;
    closePopup(popupTypeEdit);
}

//слушатель клика открытия попапа редактирования профайла
buttonEditForm.addEventListener('click', () => {
    openPopupProfile();
    setSubmitButtonState (formProfile, validationConfig);

    inputsProfile.forEach(function(input) {
        handleFieldInput(formProfile, input, validationConfig)
    });
});

//слушатель клика закрытия попапа редактирования профайла
buttonCloseEditForm.addEventListener('click', () => closePopup(popupTypeEdit));

popupProfileForm.addEventListener('submit', handleEditProfileSubmit);
popupTypeEdit.addEventListener('click', clickOverlay);

//слушатель клика открытия попапа карточки
buttonAddForm.addEventListener('click', () => {
    openPopup(popupTypeCard);
    formCard.reset();

    setSubmitButtonState (formCard, validationConfig);
    inputsCard.forEach(function (item) {
        hideError(formCard, item, validationConfig)
    });
});

//слушатель клика закрытия попапа карточки
buttonCloseAddForm.addEventListener('click', () => closePopup(popupTypeCard));

popupFormCard.addEventListener('submit', handleAddCardSubmit);
popupTypeCard.addEventListener('click', clickOverlay);

//слушатель клика закрытия попапа изображения
buttonCloseFormImage.addEventListener('click', () => closePopup(popupTypeImage));
popupTypeImage.addEventListener('click', clickOverlay);