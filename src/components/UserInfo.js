export default class UserInfo {
  constructor({ id = "", profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userDescription = document.querySelector(profileDescriptionSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
    this._id = id;
  }

  getUserInfo() {
    return {
      _id: this._id,
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src
    };
  }

  setUserInfo(userData) {
    this._id = userData._id;
    this._userName.textContent = userData.name;
    this._userDescription.textContent = userData.about;
    this._userAvatar.src = userData.avatar;
  }
}
