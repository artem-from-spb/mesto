export default class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  ///1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Что-то пошло не так :(");
    });
  }

  ///2. Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Что-то пошло не так :(");
    });
  }

  //3. Редактирование профиля
    editProfileData(data) {
      return fetch(`${this._url}users/me`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: 'Marie Skłodowska Curie',
            about: 'Physicist and Chemist'
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("Что-то пошло не так :(");
      });
    }

  

  //   addNewCard(data) {
  //     return fetch(`${this._url}cards`, {
  //       method: "POST",
  //       headers: this._headers,
  //       body: JSON.stringify({
  //           name: data.name,
  //           link: data.link
  //       })
  //     }).then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }

  //       return Promise.reject("Что-то пошло не так :(");
  //     });
  //   }
}
