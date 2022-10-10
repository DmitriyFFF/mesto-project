export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl,
    this._headers = config.headers
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
//Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Загрузка информации о пользователе с сервера
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Редактирование профиля
  editProfile(nameInput, aboutInput) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: aboutInput.value
      })
    })
      .then(this._checkResponse);
  }
//Добавление новой карточки
  addNewCard(urlCard, nameCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameCard.value,
        link: urlCard.value
      })
    })
      .then(this._checkResponse);
  }
//Запрос на удаление карточек пользователя
  deleteCardApi(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Добавление лайка
  addLikeApi(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Снятие лайка
  deleteLikeApi(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Редактирование аватара
  patchAvatar(avatarInput) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarInput.value}`
      })
    })
      .then(this._checkResponse);
  }
}

