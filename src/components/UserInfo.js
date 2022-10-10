export default class UserInfo {
  constructor({ id = "", profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userDescription = document.querySelector(profileDescriptionSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
    this._user = {
      _id: id,
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src
    };
  }

  getUserInfo() {
    return this._user;
  };

  setUserInfo(UserData) {
    this._user._id = UserData._id;
    this._userName.textContent = UserData.name;
    this._userDescription.textContent = UserData.about;
    this._userAvatar.src = UserData.avatar;
  }
}
