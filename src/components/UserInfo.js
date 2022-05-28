export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }

  returnUserId() {
    return this._userId;
  }
}
