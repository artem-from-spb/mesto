import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        
    }
}