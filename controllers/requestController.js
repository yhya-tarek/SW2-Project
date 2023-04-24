const REQUESTDB = require("../models/RequestDb");

class REQUEST {

  constructor(user) {
    this.request = new CRUD_REQUEST(user)
  }

  GET_REQUEST() {
    this.request.getRequest()
  }

  SEND_REQUEST() {
    this.request.sendRequest()
  }

  RESPOND_TO_REQUEST() {
    this.request.respondToRequest()
  }

  DELETE_REQUEST() {
    this.request.deleteRequest()
  }

}

class CRUD_REQUEST {
  constructor(user) {
    this.user = user
  }

  getRequest() {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.GetRequest(req, res);
    };
  };

  sendRequest() {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.SendRequest(req, res);
    };
  };

  respondToRequest() {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.RespondToRequest(req, res);
    };
  };

  deleteRequest() {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.DeleteRequest(req, res);
    };
  };

}

///////DEPENDANCY INJECTION/////////////

class REQUESTS {
  getRequests = () => {
    return (req, res) => {
      const requestDB = new REQUESTDB();
      requestDB.GetRequests(req, res);
    };
  };
}

module.exports = REQUEST;
module.exports = REQUESTS;
