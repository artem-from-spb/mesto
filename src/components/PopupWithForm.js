import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  getInputValues() {
    this._formData = {};
    this._inputList.forEach((item) => {
      this._formData[item.name] = item.value;
    });

    return this._formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading, defaultText = "Сохранить") {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = defaultText;
    }
  }
}
