const USERDB = require("../models/UserDB");

//Dependency Inversion

class USER {

  constructor(user) {
    this.stripe = new CRUD_USER(user)
  }

  ADD_USER() {
    this.stripe.addNewUser()
  }

  UPDATE_USER() {
    this.stripe.updateUser()
  }

  DELETE_USER() {
    this.stripe.deleteUser()
  }

}

class CRUD_USER {
  constructor(user) {
    this.user = user
  }

  addNewUser = () => {
    return (req, res) => {
      const userDB = new USERDB(req, res);
      userDB.addNewUser();
    };
  };

  updateUser = () => {
    return (req, res) => {
      const userDB = new USERDB(req, res);
      userDB.updateUser();
    };
  };

  deleteUser = () => {
    return (req, res) => {
      const userDB = new USERDB(req, res);
      userDB.deleteUser();
    };
  };

}
/////////////////////////////////
//GET_APPLICANTS

///////DEPENDANCY INJECTION/////////////

class APPLICANTS {
  constructor(user) {
    this.app = new GET_APPLICANTS(user)
  }

  GET_APPS() {
    this.app.getApplicants()
  }

  GET_APP() {
    this.app.getApplicant()
  }
}

class GET_APPLICANTS {

  constructor(user) {
    this.user = user
  }

  getApplicants = () => {
    return (req, res) => {
      const userDB = new USERDB(req, res);
      userDB.GetUsers();
    };
  };

  getApplicant = () => {
    return (req, res) => {
      const userDB = new USERDB(req, res);
      userDB.GetUser();
    };
  };
}
////////////////////////

///////DEPENDANCY INJECTION/////////////

//GET_REQUESTS

class GET_REQUESTS {
  getRequests = () => {
    return (req, res) => {
      const sql = `SELECT * FROM request_job`;
      connection.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    };
  };
}
module.exports = USER;
module.exports = APPLICANTS;
module.exports = GET_REQUESTS;
