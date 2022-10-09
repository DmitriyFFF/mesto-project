export default class UserInfo {
  constructor({profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userDescription = document.querySelector(profileDescriptionSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
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
    this._userDescription.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
