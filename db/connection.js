const mysql = require("mysql");
class CONNECTION {
  constructor() {
    this.Connection();
  }
  Connection = () => {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employee-dashboard-db",
      port: "3306",
    });
  };
}

module.exports = CONNECTION;
