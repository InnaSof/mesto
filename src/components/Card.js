export class Card {
  constructor(item, templateSelector, handleCardClick, api, userId, popupConfirm) {
    this._cardId = item._id
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._popupConfirm = popupConfirm

    this._api = api;
    this._userId = userId; // id текущего пользователя
    this._ownerId = item.owner._id; // id создателя карточки

    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    this._element = document.querySelector(this._templateSelector)
    .content.querySelector('.element').cloneNode(true);
    
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._openImage = this._element.querySelector('.element__image');
  }

  //слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._openImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCard() {
    if (!this._likeButton.classList.contains('element__like-button_active')) {
      this._api.addLike(this._cardId)
        .then((res) => {
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.add('element__like-button_active')
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this._api.removeLike(this._cardId)
        .then((res) => {
          const count = res.likes.length;
          if(count == 0){
            this._likeCounter.textContent = null;
          }
          else{
            this._likeCounter.textContent = count;
          }
          this._likeButton.classList.remove('element__like-button_active')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  _handleDeleteCard() {
    this._popupConfirm.open(this._cardId, this._api, this._deleteButton);
  }

  createCard() {
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    const count = this._likes.length;
    if(count == 0){
      this._likeCounter.textContent = null;
    }
    else{
      this._likeCounter.textContent = count;
    }

    this._likes.forEach((element) => {
      if(element._id == this._userId) {
        this._likeButton.classList.add('element__like-button_active');
      }
    })

    if(!(this._ownerId == this._userId)) {
      this._deleteButton.style.display = 'none';
    }

    this._setEventListeners();

    return this._element;
  }
}
