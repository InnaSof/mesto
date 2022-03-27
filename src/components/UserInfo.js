export class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const dataUser = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }
    return dataUser;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}


