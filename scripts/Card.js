export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  //слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove();
  }

  createCard() {
    this._element = this._getTemplate();

    this._cardTitle = this._element.querySelector('.element__title');
    this._cardTitle.textContent = this._name;

    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
