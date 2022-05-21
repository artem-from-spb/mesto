import Popup from "./Popup.js";
import { pictureXl, pictureCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  open(text, pic) {
    pictureXl.src = pic;
    pictureCaption.textContent = text;
    pictureXl.alt = text;

    super.open();
  }
}
