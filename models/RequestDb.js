const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
//Dependency Inversion
class REQUEST_DB {
  constructor(user) {
    this.req = new CRUD_REQUEST_DB(user)
  }

  GET_REQUEST() {
    this.request.GetRequest(req.res)
  }

  SEND_REQUEST() {
    this.request.SendRequest(req, res)
  }

  RESPOND_TO_REQUEST() {
    this.request.RespondToRequest(req, res)
  }

  DELETE_REQUEST() {
    this.request.DeleteRequest(req.res)
  }
}

class CRUD_REQUEST_DB {
  constructor(user) {
    this.user = user
  }


  GetRequest(req, res) {
    const { user_id } = req.params;
    const sql = `SELECT * FROM request_job where user_id = ${user_id}`;
    connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  SendRequest(req, res) {
    const sql = `select * from request_job where user_id = ${req.body.user_id} and job_id = ${req.body.job_id}`;
    connection.query(sql, (err, result, fields) => {
      if (err) {
        return res.json(err);
      } else if (!result[0]) {
        const date = new Date();
        const sql =
          "INSERT INTO request_job (`user_id`,`job_id`,`response`,`date`) VALUES (?)";
        const values = [
          req.body.user_id,
          req.body.job_id,
          3,
          date.toISOString().slice(0, 10),
        ];
        connection.query(sql, [values], (err, data) => {
          if (err) return res.json(err);
          return res.status(201).json(data);
        });
      } else {
        return res
          .status(400)
          .json({ msg: "you have already requested this job" });
      }
    });
  }

  RespondToRequest(req, res) {
    const { user_id, job_id } = req.params;
    const newData = req.body;
    const sql = `update request_job set response = "${newData.response}" where user_id = ${user_id} and job_id = ${job_id}`;
    connection.query(sql, (err) => {
      if (err) {
        res.status(400).json({ msg: err.sqlMessage });
      } else {
        res.status(200).json({ msg: "updated successfully" });
      }
    });
  }

  DeleteRequest(req, res) {
    const user_id = req.params.user_id;
    const job_id = req.params.job_id;
    const sql = `DELETE FROM request_job WHERE user_id = ${user_id} and job_id = ${job_id}`;
    connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }
}

class GET_REQUESTS {
  GetRequests(req, res) {
    const sql = `SELECT * FROM request_job`;
    connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }
}
module.exports = REQUEST_DB;
module.exports = GET_REQUESTS;
