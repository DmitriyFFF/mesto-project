export default class UserInfo {
  constructor(objectUserSelectors) {
    this._userName = document.querySelector(objectUserSelectors.name);
    this._userAbout = document.querySelector(objectUserSelectors.about);
  }

  getUserInfo() {

    return this._userInfo;
  }

  setUserInfo() {

  }
}
