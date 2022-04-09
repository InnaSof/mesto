import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = popupSelector.querySelector('.popup__form');
  }

  open(carId, api, button) {
    super.open()
    this._carId = carId;
    this._api = api;
    this._button = button;
  }

  setEventListeners() {
    super.setEventListeners()

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._api.deleteCard(this._carId)
      .then((res) => {
        if (res.message == 'Пост удалён'){
          this._button.closest('.element').remove();
          super.close();
        }    
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }
}
