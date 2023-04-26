const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();

//Dependency Inversion

class SKILL_DB {
  constructor(skill) {
    this.skill = skill;
  }
  CreateSkill() {
    this.skill.CreateSkill();
  }

  DeleteSkill() {
    this.skill.DeleteSkill();
  }

  GetSkill() {
    this.skill.GetSkill();
  }

  GetSkills() {
    this.skill.GetSkills();
  }
}

class CRUD_SKILL_DB {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  GetSkill() {
    const { user_id } = this.req.params;
    const sql = `select * from skill inner join user_skills on skill.skill_id = user_skills.skill_id`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        this.res.status(404).json("failed to read files");
      } else {
        if (!result[0]) {
          return this.res.status(404).json({ msg: "Not Found" });
        }
        return this.res.status(200).json(result);
      }
    });
  }

  GetSkills(req, res) {
    connection.query("select * from skill", (err, result) => {
      if (err) {
        console.log(err);
        this.res.status(404).json("failed to read files");
      } else {
        this.res.status(200).json(result);
      }
    });
  }

  CreateSkill(req, res) {
    const newData = this.req.body;
    const sql = `SELECT * FROM skill where skill = "${newData.skill}"`;
    connection.query(sql, (err, result, fields) => {
      if (err) {
        return this.res.status(400).json(err);
      } else if (!result[0]) {
        sql = `insert into skill set skill = "${newData.skill}"`;
        connection.query(sql, (err) => {
          if (err) {
            this.res.statusCode = 500;
            this.res.status(500).json(err);
          } else {
            this.res.status(201).json("skill added successful");
          }
        });
      } else {
        return this.res.status(400).json({ msg: "skill is found" });
      }
    });
  }

  DeleteSkill(req, res) {
    const { skill_id } = this.req.params;
    sql = `delete from skill where skill_id = ${skill_id}`;
    connection.query(sql, (err) => {
      if (err) {
        return this.res.status(404).json({ msg: "failed to delete user" });
      } else {
        return this.res.status(200).json({ msg: "successfully deleted" });
      }
    });
  }
}

// class GET_SKILLS {
//   GetSkills(req, res) {
//     connection.query("select * from skill", (err, result) => {
//       if (err) {
//         console.log(err);
//         this.res.status(404).json("failed to read files");
//       } else {
//         this.res.status(200).json(result);
//       }
//     });
//   }
// }

module.exports = { SKILL_DB, CRUD_SKILL_DB };
// module.exports = GET_SKILLS;
