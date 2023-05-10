const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
const bcrypt = require("bcrypt");

//Dependency Inversion

class USER_DB {
  constructor(userDB) {
    this.userDB = userDB;
  }

  AddNewUser() {
    this.userDB.AddNewUser();
  }

  UpdateUser() {
    this.userDB.UpdateUser();
  }

  DeleteUser() {
    this.userDB.DeleteUser();
  }

  GetUser() {
    this.userDB.GetUser();
  }
  GetUsers() {
    this.userDB.GetUsers();
  }
}

class CRUD_USER_DB {
  constructor(req, res) {
    this.mysqldb = new CRUD_MYSQL_USER_DB(req, res);
  }

  GetUsers() {
    this.mysqldb.MysqlGetUsers();
  }

  GetUser() {
    this.mysqldb.MysqlGetUser();
  }

  AddNewUser() {
    this.mysqldb.MysqlAddNewUser();
  }

  UpdateUser() {
    this.mysqldb.MysqlUpdateUser();
  }

  DeleteUser() {
    this.mysqldb.MysqlDeleteUser();
  }
}

class CRUD_MYSQL_USER_DB {
  constructor(req, res) {
    this.res = res;
    this.req = req;
  }

  MysqlGetUser() {
    const { user_id } = this.req.params;
    connection.query(
      `select * from user where user_id = ${user_id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          this.res.status(404).json("failed to read files");
        } else {
          this.res.status(200).json(result);
        }
      }
    );
  }

  MysqlAddNewUser() {
    const newData = this.req.body;
    let skill_ids = [];
    for (let i = 0; i < newData.skill.length || i === 0; i++) {
      connection.query(
        `select skill_id from skill where skill = "${newData.skill[i]}"`,
        async (err, result, fields) => {
          skill_ids[i] = result[0];
          skill_ids = skill_ids.filter((elem) => {
            return elem != null;
          });
          if (i >= newData.skill.length - 1) {
            const hashedPassword = await bcrypt.hash(
              this.req.body.password,
              10
            );
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
                  return this.res.status(500).json(err);
                } else {
                  let id = result.insertId;
                  skill_ids.forEach((elem) => {
                    const sql = `insert into user_skills (skill_id, user_id) values (${elem.skill_id}, ${id})`;
                    connection.query(sql, (err, result) => {
                      if (err) {
                        return this.res.status(500).json(err);
                      }
                    });
                  });
                  return this.res
                    .status(201)
                    .json("user successfully has been added");
                }
              }
            );
          }
        }
      );
    }
  }

  MysqlUpdateUser() {
    const { user_id } = this.req.params;
    const sql = `SELECT * FROM user where user_id = ${user_id}`;
    connection.query(sql, (err, result, fields) => {
      if (err) {
        return this.res.status(400).json(err);
      } else if (result[0]) {
        const newData = this.req.body;
        connection.query(
          "update user set? where?",
          [
            {
              name: newData.name,
              Email: newData.Email,
              password: newData.password,
              phone: newData.phone,
              type: newData.type,
              status: newData.status,
              bio: newData.bio,
            },
            { user_id: user_id },
          ],
          (err) => {
            if (err) {
              this.res.status(400).json({ msg: err.sqlMessage });
            } else {
              this.res.status(200).json({ msg: "updated successfully" });
            }
          }
        );
      } else {
        return this.res.status(404).json({ msg: "no user was found" });
      }
    });
  }

  MysqlDeleteUser() {
    const { user_id } = this.req.params;
    connection.query(
      "delete from user where ?",
      { user_id: user_id },
      (err) => {
        if (err) {
          this.res.statusCode = 500;
          console.log(err);
          this.res.json({ msg: "failed to delete user" });
        } else {
          this.res.json({ msg: "successfully deleted" });
        }
      }
    );
  }

  MysqlGetUsers() {
    connection.query("select * from user", (err, result) => {
      if (err) {
        console.log(err);
        this.res.status(404).json("failed to read files");
      } else {
        this.res.status(200).json(result);
      }
    });
  }
}

module.exports = { USER_DB, CRUD_USER_DB };
