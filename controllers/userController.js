const { USER_DB, CRUD_USER_DB } = require("../models/UserDB");

//Dependency Inversion

class USER {
  constructor(user) {
    this.user = user;
  }

  addNewUser() {
    return this.user.addNewUser();
  }

  updateUser() {
    return this.user.updateUser();
  }

  deleteUser() {
    return this.user.deleteUser();
  }

  getApplicants() {
    return this.user.getApplicants();
  }

  getApplicant() {
    return this.user.getApplicant();
  }
}

class CRUD_USER {
  constructor() {}

  addNewUser = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.AddNewUser();
    };
  };

  updateUser = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.UpdateUser();
    };
  };

  deleteUser = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.DeleteUser();
    };
  };

  getApplicants = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.GetUsers();
    };
  };

  getApplicant = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.GetUser();
    };
  };
}

module.exports = { USER, CRUD_USER };
