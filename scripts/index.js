let buttonEditForm = document.querySelector('.profile__edit-button');
let buttonCloseForm = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let popupOpenedClass = 'popup_opened';
let nameInput = document.querySelector('.profile__title');
let jobInput = document.querySelector('.profile__subtitle');
let popupForm = document.querySelector('.popup__container');
let popupFormName = document.getElementById('name-input');
let popupFormJob = document.getElementById('job-input');

// функция открытия попап
function openPopup() {
    popup.classList.add(popupOpenedClass);
    popupFormName.value = nameInput.textContent;
    popupFormJob.value = jobInput.textContent;
}

// функция закрытия попап
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

buttonEditForm.addEventListener('click', openPopup);

buttonCloseForm.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler);