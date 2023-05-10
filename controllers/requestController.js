const { REQUEST_DB, CRUD_REQUEST_DB } = require("../models/RequestDb");

class REQUEST {
  constructor(request) {
    this.request = request;
  }

  getRequests() {
    return this.request.getRequests();
  }

  getRequest() {
    return this.request.getRequest();
  }

  sendRequest() {
    return this.request.sendRequest();
  }

  respondToRequest() {
    return this.request.respondToRequest();
  }

  deleteRequest() {
    return this.request.deleteRequest();
  }
}

class CRUD_REQUEST {
  constructor() {}

  getRequests = () => {
    return (req, res) => {
      const requestDB = new REQUEST_DB(new CRUD_REQUEST_DB(req, res));
      requestDB.GetRequests();
    };
  };

  getRequest() {
    return (req, res) => {
      const requestDB = new REQUEST_DB(new CRUD_REQUEST_DB(req, res));
      requestDB.GetRequest();
    };
  }

  sendRequest() {
    return (req, res) => {
      const requestDB = new REQUEST_DB(new CRUD_REQUEST_DB(req, res));
      requestDB.SendRequest();
    };
  }

  respondToRequest() {
    return (req, res) => {
      const requestDB = new REQUEST_DB(new CRUD_REQUEST_DB(req, res));
      requestDB.RespondToRequest(req, res);
    };
  }

  deleteRequest() {
    return (req, res) => {
      const requestDB = new REQUEST_DB(new CRUD_REQUEST_DB(req, res));
      requestDB.DeleteRequest(req, res);
    };
  }
}

module.exports = { REQUEST, CRUD_REQUEST };
