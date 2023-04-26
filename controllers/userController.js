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
      userDB.addNewUser();
    };
  };

  updateUser = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.updateUser();
    };
  };

  deleteUser = () => {
    return (req, res) => {
      const userDB = new USER_DB(new CRUD_USER_DB(req, res));
      userDB.deleteUser();
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
/////////////////////////////////
//GET_APPLICANTS

///////DEPENDANCY INJECTION/////////////

class APPLICANTS {
  constructor(user) {
    this.app = new GET_APPLICANTS(user);
  }

  GET_APPS() {
    this.app.getApplicants();
  }

  GET_APP() {
    this.app.getApplicant();
  }
}

class GET_APPLICANTS {
  constructor(user) {
    this.user = user;
  }

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
module.exports = { USER, CRUD_USER };
// module.exports = APPLICANTS;
// module.exports = GET_REQUESTS;
