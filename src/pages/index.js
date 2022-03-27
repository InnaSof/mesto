import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { 
  initialCards,
  validationConfig,
  popupFormName,
  popupFormJob,
  formProfile,
  buttonAddCard,
  formCard,
  cardsList,
  popupTypeEdit,
  popupTypeImage,
  popupTypeCard,
  nameInput,
  jobInput,
  buttonEditForm
} from '../utils/constants.js';

const validationCard = new FormValidator(validationConfig, formCard);
const validationProfile = new FormValidator(validationConfig, formProfile);

// Функция создания карточки
function newCard(item) { 
  const card = new Card(item.name, item.link, '#element-template', handleCardClick);
  return card.createCard();
}

// отрисовка элементов на странице
const sectionCard = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    sectionCard.addItem(newCard(item));
  }
}, cardsList);

sectionCard.renderItems();

const popupCardImg = new PopupWithImage(popupTypeImage);

function handleCardClick(name, link) {
  popupCardImg.open(name, link);
}

const popupCardAdd = new PopupWithForm(popupTypeCard,
  function handleFormCardSubmit(item) {
    const element = {};
    element['name'] = item['card-name']
    element['link'] = item['card_url']
    sectionCard.addItem(newCard(element)); 
  }, 
  formCard);

buttonAddCard.addEventListener('click', () => {
  popupCardAdd.open();
  validationCard.resetFormValidation();
});

const userData = new UserInfo(nameInput, jobInput);

const popupProfileEdit = new PopupWithForm(popupTypeEdit,
  function handleFormCardSubmit(info) {
    userData.setUserInfo(info.name, info.description);
  }, 
  formProfile);

buttonEditForm.addEventListener('click', () => {
  popupProfileEdit.open();

  const userInfo = userData.getUserInfo();
  popupFormName.value = userInfo.name;
  popupFormJob.value = userInfo.job;

  validationProfile.resetFormValidation();
});

//включение валидации
validationProfile.enableValidation();
validationCard.enableValidation();

//слушатели
popupCardImg.setEventListeners();
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();