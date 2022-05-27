export default class Card {
  constructor(
    { name, link, likes, owner, _id, userId },
    cardSelector,
    handleCardClick,
    deleteHandler,
    addLike,
    removeLike
  ) {
    this._text = name;
    this._pic = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = owner._id;
    this._imageId = _id;
    this._likes = likes;
    this._userId = userId;
    this._deleteHandler = deleteHandler;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._handleCardLike = this._handleCardLike.bind(this);
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
    this._recycleBin = this._element.querySelector(".card__recycle-bin");
    if (this._ownerId !== this._userId) {
      this._recycleBin.remove();
    }

    //считаем лайки
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._element
          .querySelector(".card__button-like")
          .classList.add("card__like_active");
      }
    });

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
  _handleCardLike(evt) {
    //  this._buttonLike.classList.toggle("card__like_active");
    if (!evt.target.classList.contains("card__like_active")) {
      this._element
        .querySelector(".card__button-like")
        .classList.add("card__like_active");
      this._addLike();
    } else {
      this._element
        .querySelector(".card__button-like")
        .classList.remove("card__like_active");
      this._removeLike();
    }
  }

  //////
  returnCardId() {
    return this._imageId;
  }

  countLikes(counter) {
    this._element.querySelector(".card__like-counter").textContent = counter;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".card__image");
    this._buttonLike = this._element.querySelector(".card__button-like");

    this._buttonLike.addEventListener("click", this._handleCardLike);
    this._recycleBin.addEventListener("click", () => {
      this._deleteHandler();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._pic);
    });
  }
}
