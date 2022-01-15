let buttonEditForm = document.querySelector('.profile__edit-button');
let buttonCloseForm = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let popupOpenedClass = 'popup_opened';
let nameInput = document.querySelector('.profile__title');
let jobInput = document.querySelector('.profile__subtitle');
let popupForm = document.querySelector('.popup__container');
let buttonSaveForm = document.querySelector('.popup__submit-btn');

function openPopup() {
    popup.classList.add(popupOpenedClass);
}

function closePopup() {
    popup.classList.remove(popupOpenedClass);
}

buttonEditForm.addEventListener('click', function() {
    openPopup();
});

buttonCloseForm.addEventListener('click', function() {
    closePopup();
});


function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = document.getElementsByClassName('popup__text')[0].value;
    let description = document.getElementsByClassName('popup__text')[1].value;
    nameInput.textContent = name;
    jobInput.textContent = description;
    closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);