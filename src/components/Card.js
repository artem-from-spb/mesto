export default class Card {
  constructor({ name, link, myId, cardId, userId, likes }, cardSelector, handleCardClick, deleteHandler, setLike, removeLike) {
    this._text = name;
    this._pic = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = cardId;
    this._myId = myId;
    this._userId = userId;
    this._deleteHandler = deleteHandler;
    this._likes = likes;
    this._setLike = setLike;
    this._removeLike = removeLike;
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

    //проверяем id для корзины
    this._recycleBin = this._element.querySelector('.card__recycle-bin');
    if (this._myId !== this._userId) {
      this._recycleBin.remove();
    }

    
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._text;
    this._cardImage.src = this._pic;
    this._cardImage.alt = this._text;

    return this._element;
  }

  removeItem() {
    this._element.remove();
    this._element = null;
  }

  //лайк
  _handleCardLike() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  //////
   returnCardId() {
    return this._cardId;
  }

  countLikes(counter) {
    this._element.querySelector('.card__like-counter').textContent = counter;
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
        this.removeItem();
     const confirmPopup = document.querySelector('.popup_confirm');
     confirmPopup.classList.add('popup_opened');
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._pic);
    });
  }

}
