import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, bigImage, caption) {
    super(popupSelector);
    this._bigImage = this._popup.querySelector(bigImage);
    this._caption = this._popup.querySelector(caption);
  }

  open(text, pic) {
    this._bigImage.src = pic;
    this._caption.textContent = text;
    this._bigImage.alt = text;

    super.open();
  }
}
