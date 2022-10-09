export default class UserInfo {
  constructor({profileName, profileDescription, profileAvatar}) {
    this._userName = document.querySelector(profileName);
    this._userDescription = document.querySelector(profileDescription);
    this._userAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src
    };
    //return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.description;
    this._userAvatar.src = data.avatar;
  }
}
