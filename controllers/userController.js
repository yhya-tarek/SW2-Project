const USERDB = require("../models/UserDB");

class USER {
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
