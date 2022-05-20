

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._text = name;
    this._pic = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  //клон шаблона
  _getTemplate() {
    const cardElement = document.querySelector("#card-template").content.querySelector(this._cardSelector).cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._text;
    cardImage.src = this._pic;
    cardImage.alt = this._text;

    return this._element;
  }

  _removeItem() {
    this._element.remove();
    this._element = null;
  }

  //лайк
  _handleCardLike() {
    this._element
      .querySelector(".card__button-like")
      .classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._handleCardLike();
      });

    this._element
      .querySelector(".card__recycle-byn")
      .addEventListener("click", () => {
        this._removeItem();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._text, this._pic);
      });
  }
}
