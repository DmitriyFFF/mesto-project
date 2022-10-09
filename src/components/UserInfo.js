export default class UserInfo {
  constructor({id = '', profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userDescription = document.querySelector(profileDescriptionSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      // _id: id,
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src
    };
    //return this._userInfo;
  }

  setUserInfo(data) {
    this._userId = data._id;
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
