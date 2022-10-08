/*Новый код */

export default class Api {
  constructor(config) {
    this._url = config.url,
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
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Загрузка информации о пользователе с сервера
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Редактирование профиля
  editProfile(nameInput, aboutInput) {
    return fetch(`${this._url}/users/me`, {
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
    return fetch(`${this._url}/cards`, {
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
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Добавление лайка
  addLikeApi(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Снятие лайка
  deleteLikeApi(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
//Редактирование аватара
  patchAvatar(avatarInput) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarInput.value}`
      })
    })
      .then(this._checkResponse);
  }
}



/*Старый код */

//Загрузка информации о пользователе с сервера
/* export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse);
}

//Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse);
}

//Редактирование профиля
export const editProfile = (nameInput, aboutInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value
    })
  })
    .then(checkResponse);
}

//Добавление новой карточки
export const addNewCard = (urlCard, nameCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard.value,
      link: urlCard.value
    })
  })
    .then(checkResponse);
}

//Запрос на удаление карточек пользователя
export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

//Добавление лайка
export const addLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse);
}

//Снятие лайка
export const deleteLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

//Редактирование аватара
export const patchAvatar = (avatarInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarInput.value}`
    })
  })
    .then(checkResponse);
} */
