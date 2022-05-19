import Popup from "./Popup.js";
import {pictureXl, pictureCaption } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, text, pic }) {
        super(popupSelector);
        this._text = text;
        this._pic = pic;
    }

    open(text, pic) {
        pictureXl.src = pic;
        pictureCaption.textContent = text;
        pictureXl.alt = text;
    
        super.open();
    }
}

