let buttonEditForm = document.querySelector('.profile__edit-button');
let buttonCloseEditForm = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let popupOpenedClass = 'popup_opened';
let nameInput = document.querySelector('.profile__title');
let jobInput = document.querySelector('.profile__subtitle');
let popupForm = document.querySelector('.popup__container');
let popupFormName = document.getElementById('name-input');
let popupFormJob = document.getElementById('job-input');

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

const cardsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template')
    .content.querySelector('.element');
const buttonAddForm = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_card');
const buttonCloseAddForm = popupAddCard.querySelector('.popup__close-btn');
const popupFormCard = document.querySelector('.popup__container_card');
const inputCardName = document.querySelector('[name="card-name"]');
const inputCardLink = document.querySelector('[name="card_url"]');

const popupFormImage = document.querySelector('.popup_type_image');
const buttonCloseFormImage = popupFormImage.querySelector('.popup__close-btn');

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
const seePopupImage = (item) => {
    const popupImage = document.querySelector('.popup__image');
    const popupImageName = document.querySelector('.popup__image-name');
    const popupImageCard = document.querySelector('.popup__image-card');

    openPopupImage();
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
    inputCardName.value = '';
    inputCardLink.value = '';

    addElement(element, cardsList);
    closePopupAddCards();
}

//функция перебирает массив и добавляет элементы из массива в карточку
initialCards.forEach(item => {
    addElement(item, cardsList)
})

//функция открытия попап просмотра изображения
function openPopupImage() {
    popupFormImage.classList.add(popupOpenedClass);
}

//функция закрытия попап просмотра изображения
function closePopupImage() {
    popupFormImage.classList.remove(popupOpenedClass);
}

// функция открытия попап создания карточек
function openPopupAddCards() {
    popupAddCard.classList.add(popupOpenedClass);
}
// функция закрытия попап создания карточек
function closePopupAddCards() {
    popupAddCard.classList.remove(popupOpenedClass);
}


// функция открытия попап редактирования
function openPopup() {
    popup.classList.add(popupOpenedClass);
    popupFormName.value = nameInput.textContent;
    popupFormJob.value = jobInput.textContent;
}
// функция закрытия попап редактирования
function closePopup() {
    popup.classList.remove(popupOpenedClass);
}

// функция меняет данные на сайте, в соответвии с вносимыми данными в форму попап
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent = popupFormName.value;
    jobInput.textContent = popupFormJob.value;
    closePopup();
}

//слушатели редактирования формы
buttonEditForm.addEventListener('click', openPopup);
buttonCloseEditForm.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);

//слушатели добавления формы карточек
buttonAddForm.addEventListener('click', openPopupAddCards);
buttonCloseAddForm.addEventListener('click', closePopupAddCards);
popupFormCard.addEventListener('submit', handleAddCardSubmit);

buttonCloseFormImage.addEventListener('click', closePopupImage);