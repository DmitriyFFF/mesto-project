export default class UserInfo {
  constructor(userDataSelectors) {
    this._userName = document.querySelector(userDataSelectors.name);
    this._userDescription = document.querySelector(userDataSelectors.description);
    this._userAvatar = document.querySelector(userDataSelectors.avatar);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src
    }
    return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
