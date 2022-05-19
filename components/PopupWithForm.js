import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }
        
    _getInputValues() {
        this._formData = {};
        this._inputList.forEach((item) => {
          this._formData[item.name] = item.value;
        });
    
        return this._formData;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
          });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}