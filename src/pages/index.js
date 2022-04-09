import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

import { 
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
  buttonEditForm,
  popupTypeAvatar,
  formAvatar,
  buttonEditAvatar,
  avatarInputUrl,
  profileAvatar,
  popupTypeConfirm
} from '../utils/constants.js';


const userData = new UserInfo(nameInput, jobInput, profileAvatar);
const validationCard = new FormValidator(validationConfig, formCard);
const validationProfile = new FormValidator(validationConfig, formProfile);
const popupCardImg = new PopupWithImage(popupTypeImage);
const validationFormAvatar = new FormValidator(validationConfig, formAvatar);
const popupConfirm = new PopupWithConfirmation(popupTypeConfirm);

  // Инициализируем API
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
      authorization: '964ddb5f-cae8-4ecc-a75e-1f5f4cc52e46',
      'Content-Type': 'application/json'
    }
  });

  //Загрузка данных профайла с сервера
  let userId
  api.getProfileInfo()
  .then((user) => {
    userId = user._id
    userData.setUserInfo(user.name, user.about);
    userData.setUserAvatar(user.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

  // PATCH редактируем профайл
  const popupProfileEdit = new PopupWithForm(popupTypeEdit,
    function handleFormSubmit(data) {
      popupProfileEdit.renderLoading(true);
      api.editProfile(data.name, data.description)
        .then((user) => {
          userData.setUserInfo(user.name, user.about);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          popupProfileEdit.renderLoading(false);
        })
    }, formProfile);

// PATCH редактируем Аватар
  const popupAvatarEdit = new PopupWithForm(popupTypeAvatar, 
    function handleFormSubmit(avatar) {
      popupAvatarEdit.renderLoading(true);
      api.editAvatar(avatar.avatar)
        .then(() => {
          profileAvatar = userData.setUserAvatar(avatar.avatar);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          popupAvatarEdit.renderLoading(false);
        })
    }, formAvatar);

  // Функция создания карточки
  function newCard(item) { 
    const card = new Card(item, '#element-template', handleCardClick, api, userId, popupConfirm);
    return card.createCard();
  }

  function handleCardClick(name, link) {
    popupCardImg.open(name, link);
  }

  //Загрузка карточек с сервера
  api.getInitialCards()
  .then((res) => {
    sectionCard.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  }); 

  // Отрисовка элементов на странице
  const sectionCard = new Section({ 
    renderer: (item) => {
      sectionCard.addItem(newCard(item));
    }
  }, cardsList);

  // POST Добавление новой карточки.
  const popupCardAdd = new PopupWithForm(popupTypeCard,
    function handleFormSubmit(item) {
      popupCardAdd.renderLoading(true);
      api.addCard(item['card-name'], item['card_url'])
        .then((res) => {
          sectionCard.addItem(newCard(res));  
        })
        .catch((err) => console.error(err))
        .finally(() => {
          popupCardAdd.renderLoading(false);
        })
    }, formCard);


buttonEditForm.addEventListener('click', () => {
  popupProfileEdit.open();
  popupFormName.value = userData.getUserInfo().name;
  popupFormJob.value = userData.getUserInfo().about;
  validationProfile.resetFormValidation();
});
  
buttonAddCard.addEventListener('click', () => {
  popupCardAdd.open();
  validationCard.resetFormValidation();
});

buttonEditAvatar.addEventListener('click', () => {
  popupAvatarEdit.open();
  avatarInputUrl.value = '';
  validationFormAvatar.resetFormValidation();
});

//включение валидации
validationProfile.enableValidation();
validationCard.enableValidation();
validationFormAvatar.enableValidation();

//слушатели
popupCardImg.setEventListeners();
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();
popupConfirm.setEventListeners();
