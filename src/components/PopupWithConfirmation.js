import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButtonSaveConfirm = document.querySelector(
      ".popup__button-save_confirm"
    );
  }

  open(removeCard) {
    super.open();
    this._handleRemoveButton = removeCard;
    this._popupButtonSaveConfirm.addEventListener(
      "click",
      this._handleRemoveButton
    );
  }

  close() {
    super.close();
    this._popupButtonSaveConfirm.removeEventListener(
      "click",
      this._handleRemoveButton
    );
  }
}
