export default class Card {
  constructor(
    { name, link, likes, owner, _id, userId },
    cardTemplate,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    setLike,
    removeLike
  ) {
    this._text = name;
    this._pic = link;
    this._cardTemplate = cardTemplate;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = owner._id;
    this._imageId = _id;
    this._likes = likes;
    this._userId = userId;
    this._handleDeleteCard = handleDeleteCard;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._handleCardLike = this._handleCardLike.bind(this);
  }
  //клон шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._recycleBin = this._element.querySelector(".card__recycle-bin");
    this._buttonLike = this._element.querySelector(".card__button-like");
    this._counter = this._element.querySelector(".card__like-counter");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardText = this._element.querySelector(".card__title");

    //проверяем id для корзины
    if (this._ownerId !== this._userId) {
      this._recycleBin.remove();
    }

    //считаем лайки
    this._counter.textContent = this._likes.length;
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._buttonLike.classList.add("card__like_active");
      }
    });

    this._setEventListeners();

    this._cardText.textContent = this._text;
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
    if (!evt.target.classList.contains("card__like_active")) {
      //  this._buttonLike.classList.add("card__like_active");
      this._setLike();
    } else {
      //  this._buttonLike.classList.remove("card__like_active");
      this._removeLike();
    }
  }

  toggleLike() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  returnCardId() {
    return this._imageId;
  }

  countLikes(counter) {
    this._counter.textContent = counter;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", this._handleCardLike);
    this._recycleBin.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._pic);
    });
  }
}
