import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgName = document.querySelector('.popup__image-name');
    this._imgLink = document.querySelector('.popup__image');
  }

  open(name, link) {
    this._imgLink.src = link;
    this._imgLink.alt = name;
    this._imgName.textContent = name;
  
    super.open();
  }
}

