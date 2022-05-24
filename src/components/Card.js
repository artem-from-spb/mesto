export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._text = name;
    this._pic = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  //клон шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._text;
    this._cardImage.src = this._pic;
    this._cardImage.alt = this._text;

    return this._element;
  }

  _removeItem() {
    this._element.remove();
    this._element = null;
  }

  //лайк
  _handleCardLike() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".card__image");
    this._buttonLike = this._element.querySelector(".card__button-like");

    this._buttonLike.addEventListener("click", () => {
      this._handleCardLike();
    });

    this._element
      .querySelector(".card__recycle-bin")
      .addEventListener("click", () => {
     //   this._removeItem();
     const confirmPopup = document.querySelector('.popup_confirm');
     confirmPopup.classList.add('popup_opened');
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._pic);
    });
  }
}
