const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
const bcrypt = require("bcrypt");

//Single Responsibility

class LOGIN {
  loginAuth = () => {
    return async (req, res) => {
      const data = req.body;
      const sql = `SELECT * FROM user WHERE Email = "${data.Email}" limit 1`;
      connection.query(sql, async (err, result, fields) => {
        if (err) {
          res.statusCode = 400;
          res.json(err);
        } else if (result[0]) {
          try {
            if (await bcrypt.compare(data.password, result[0].password)) {
              req.session.Email = data.Email;
              req.session.type = result[0].type;
              req.session.name = result[0].name;
              req.session.user_id = result[0].user_id;
              connection.query(
                `update user set status = "active" where user_id = ${result[0].user_id}`,
                (err) => {
                  if (err) console.log(err);
                }
              );
              return res
                .status(200)
                .json({ user: result[0], authorized: true });
            } else {
              return res.status(401).json({
                msg: "Incorrect Email or password",
                authorized: false,
              });
            }
          } catch (error) {
            return res.status(500).send(error);
          }
        } else {
          return res.status(401).json({ msg: "Incorrect Email or password" });
        }
        res.end();
      });
    };
  };
}

module.exports = LOGIN;
