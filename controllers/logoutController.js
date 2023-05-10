const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();

//Single Responsibility

class LOGOUT {
  logOut = () => {
    return (req, res) => {
      connection.query(
        `update user set status = "in-active" where user_id = ${req.session.user_id}`,
        (err) => {
          if (err) console.log(err);
        }
      );
      req.session.destroy();
      return res.status(200).send(success);
    };
  };
}
module.exports = LOGOUT;
