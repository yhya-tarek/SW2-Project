const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
//Dependency Inversion
class REQUEST_DB {
  constructor(requestDB) {
    this.requestDB = requestDB;
  }

  GetRequest() {
    this.requestDB.GetRequest();
  }

  GetRequests() {
    this.requestDB.GetRequests();
  }

  SendRequest() {
    this.requestDB.SendRequest();
  }

  RespondToRequest() {
    this.requestDB.RespondToRequest();
  }

  DeleteRequest() {
    this.requestDB.DeleteRequest();
  }
}

class CRUD_REQUEST_DB {
  constructor(req, res) {
    this.mysqldb = new CRUD_MYSQL_REQUEST_DB(req, res);
  }

  GetRequests() {
    this.mysqldb.MysqlGetRequests();
  }

  GetRequest() {
    this.mysqldb.MysqlGetRequest();
  }

  SendRequest() {
    this.mysqldb.MysqlSendRequest();
  }

  RespondToRequest() {
    this.mysqldb.MysqlRespondToRequest();
  }

  DeleteRequest() {
    this.mysqldb.MysqlDeleteRequest();
  }
}

class CRUD_MYSQL_REQUEST_DB {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  MysqlGetRequests() {
    const sql = `SELECT * FROM request_job`;
    connection.query(sql, (err, data) => {
      if (err) return this.res.json(err);
      return this.res.json(data);
    });
  }

  MysqlGetRequest() {
    const { user_id } = this.req.params;
    const sql = `SELECT * FROM request_job where user_id = ${user_id}`;
    connection.query(sql, (err, data) => {
      if (err) return this.res.json(err);
      return this.res.json(data);
    });
  }

  MysqlSendRequest(req, res) {
    const sql = `select * from request_job where user_id = ${this.req.body.user_id} and job_id = ${this.req.body.job_id}`;
    connection.query(sql, (err, result, fields) => {
      if (err) {
        return this.res.json(err);
      } else if (!result[0]) {
        const date = new Date();
        const sql =
          "INSERT INTO request_job (`user_id`,`job_id`,`response`,`date`) VALUES (?)";
        const values = [
          this.req.body.user_id,
          this.req.body.job_id,
          3,
          date.toISOString().slice(0, 10),
        ];
        connection.query(sql, [values], (err, data) => {
          if (err) return this.res.json(err);
          return this.res.status(201).json(data);
        });
      } else {
        return res
          .status(400)
          .json({ msg: "you have already requested this job" });
      }
    });
  }

  MysqlRespondToRequest(req, res) {
    const { user_id, job_id } = this.req.params;
    const newData = this.req.body;
    const sql = `update request_job set response = "${newData.response}" where user_id = ${user_id} and job_id = ${job_id}`;
    connection.query(sql, (err) => {
      if (err) {
        this.res.status(400).json({ msg: err.sqlMessage });
      } else {
        this.res.status(200).json({ msg: "updated successfully" });
      }
    });
  }

  MysqlDeleteRequest(req, res) {
    const user_id = this.req.params.user_id;
    const job_id = this.req.params.job_id;
    const sql = `DELETE FROM request_job WHERE user_id = ${user_id} and job_id = ${job_id}`;
    connection.query(sql, (err, data) => {
      if (err) return this.res.json(err);
      return this.res.json(data);
    });
  }
}

module.exports = { REQUEST_DB, CRUD_REQUEST_DB };
