const REQUESTDB = require("../models/RequestDb");

class REQUEST {
  getRequests = () => {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.GetRequests(req, res);
    };
  };

  getRequest = () => {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.GetRequest(req, res);
    };
  };

  sendRequest = () => {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.SendRequest(req, res);
    };
  };

  respondToRequest = () => {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.RespondToRequest(req, res);
    };
  };

  deleteRequest = () => {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.DeleteRequest(req, res);
    };
  };
}

module.exports = REQUEST;
