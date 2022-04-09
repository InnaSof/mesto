export class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    const dataUser = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
    return dataUser;
  }

  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
