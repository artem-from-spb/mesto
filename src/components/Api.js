export default class Api {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers
    }

    getInitialCards() {
        return fetch(this._url, {
            method: 'GET',
            headers: this._headers
        })
    }
}