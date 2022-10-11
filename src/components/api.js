export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl,
    this._headers = config.headers
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

//Загрузка карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

//Загрузка информации о пользователе с сервера
  getProfile() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

//Редактирование профиля
  editProfile({name, about}) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    });
  }

//Добавление новой карточки
  addNewCard({name, link}) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    });
  }

//Запрос на удаление карточек пользователя
  deleteCardApi(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

//Добавление лайка
  addLikeApi(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    });
  }

//Снятие лайка
  deleteLikeApi(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

//Редактирование аватара
  patchAvatar({link}) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${ link }`
      })
    });
  }
}

