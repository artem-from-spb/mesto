export default class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  ///0. repeat part
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("Что-то пошло не так :(");
  }

  ///1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  ///2. Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  //3. Редактирование профиля
  editProfileData(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._errorHandler);
  }

  //4. Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._errorHandler);
  }

  // 5. Отображение количества лайков карточки



  // 7. Удаление карточки
  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  ///8. Постановка и снятие лайка
  setLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  ///9. Обновление аватара пользователя
  avatarPictureNew(imageUrl) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl
      }),
    }).then(this._errorHandler);
  }
}
