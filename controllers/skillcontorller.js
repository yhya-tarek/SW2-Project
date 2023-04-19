const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();

class SKILL {
  getSkills = () => {
    return (req, res) => {
      connection.query("select * from skill", (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json("failed to read files");
        } else {
          res.status(200).json(result);
        }
      });
    };
  };

  getSkill = () => {
    return (req, res) => {
      const { user_id } = req.params;
      sql = `select * from skill inner join user_skills on skill.skill_id = user_skills.skill_id`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json("failed to read files");
        } else {
          if (!result[0]) {
            return res.status(404).json({ msg: "Not Found" });
          }
          return res.status(200).json(result);
        }
      });
    };
  };

  createSkills = () => {
    return (req, res) => {
      const newData = req.body;
      const sql = `SELECT * FROM skill where skill = "${newData.skill}"`;
      connection.query(sql, (err, result, fields) => {
        if (err) {
          return res.status(400).json(err);
        } else if (!result[0]) {
          sql = `insert into skill set skill = "${newData.skill}"`;
          connection.query(sql, (err) => {
            if (err) {
              res.statusCode = 500;
              res.status(500).json(err);
            } else {
              res.status(201).json("skill added successful");
            }
          });
        } else {
          return res.status(400).json({ msg: "skill is found" });
        }
      });
    };
  };

  deleteSkill = () => {
    return (req, res) => {
      const { skill_id } = req.params;
      sql = `delete from skill where skill_id = ${skill_id}`;
      connection.query(sql, (err) => {
        if (err) {
          return res.status(404).json({ msg: "failed to delete user" });
        } else {
          return res.status(200).json({ msg: "successfully deleted" });
        }
      });
    };
  };
}
module.exports = SKILL;
