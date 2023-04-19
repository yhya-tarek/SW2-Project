const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
const bcrypt = require("bcrypt");

class USER {
  getApplicants = () => {
    return (req, res) => {
      connection.query("select * from user", (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json("failed to read files");
        } else {
          res.status(200).json(result);
        }
      });
    };
  };

  getApplicant = () => {
    return (req, res) => {
      const { user_id } = req.params;
      connection.query(
        `select * from user where user_id = ${user_id}`,
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json("failed to read files");
          } else {
            res.status(200).json(result);
          }
        }
      );
    };
  };

  addNewUser = () => {
    return (req, res) => {
      const newData = req.body;
      let skill_ids = [];
      // console.log(i);
      for (let i = 0; i < newData.skill.length || i === 0; i++) {
        connection.query(
          `select skill_id from skill where skill = "${newData.skill[i]}"`,
          async (err, result, fields) => {
            skill_ids[i] = result[0];
            skill_ids = skill_ids.filter((elem) => {
              return elem != null;
            });
            if (i >= newData.skill.length - 1) {
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              connection.query(
                "insert into user set?",
                {
                  name: newData.name,
                  Email: newData.Email,
                  password: hashedPassword,
                  phone: newData.phone,
                  status: newData.status,
                  // image_url: newData.image_url,
                  type: newData.type,
                  bio: newData.bio,
                },
                (err, result, fields) => {
                  if (err) {
                    return res.status(500).json(err);
                  } else {
                    let id = result.insertId;
                    skill_ids.forEach((elem) => {
                      const sql = `insert into user_skills (skill_id, user_id) values (${elem.skill_id}, ${id})`;
                      connection.query(sql, (err, result) => {
                        if (err) {
                          return res.status(500).json(err);
                        }
                      });
                    });
                    return res
                      .status(201)
                      .json("user successfully has been added");
                  }
                }
              );
            }
          }
        );
      }
    };
  };

  updateUser = () => {
    return (req, res) => {
      const { user_id } = req.params;
      const sql = `SELECT * FROM user where user_id = ${user_id}`;
      connection.query(sql, (err, result, fields) => {
        if (err) {
          return res.status(400).json(err);
        } else if (result[0]) {
          const newData = req.body;
          connection.query(
            "update user set? where?",
            [
              {
                name: newData.name,
                Email: newData.Email,
                password: newData.password,
                phone: newData.phone,
                status: newData.status,
                bio: newData.bio,
              },
              { user_id: user_id },
            ],
            (err) => {
              if (err) {
                res.status(400).json({ msg: err.sqlMessage });
              } else {
                res.status(200).json({ msg: "updated successfully" });
              }
            }
          );
        } else {
          return res.status(404).json({ msg: "no user was found" });
        }
      });
    };
  };

  deleteUser = () => {
    return (req, res) => {
      const { user_id } = req.params;
      connection.query(
        "delete from user where ?",
        { user_id: user_id },
        (err) => {
          if (err) {
            res.statusCode = 500;
            console.log(err);
            res.json({ msg: "failed to delete user" });
          } else {
            res.json({ msg: "successfully deleted" });
          }
        }
      );
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
