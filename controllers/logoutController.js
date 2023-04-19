const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
class LOGOUT {
  logOut = () => {
    return (req, res) => {
      const { user_id } = req.body;
      req.session.destroy();
      connection.query(
        `update user set status = "in-active" where user_id = ${user_id}`,
        (err) => {
          if (err) console.log(err);
        }
      );
      return res.status(200).send();
    };
  };
}
module.exports = LOGOUT;
