const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();

//Dependency Inversion

class QUALIFICATION_DB {
  constructor(qualificationDB) {
    this.qualification = qualificationDB;
  }

  CreateQualification() {
    this.qualification.CreateQualification();
  }

  GetQualification() {
    this.qualification.GetQualification();
  }

  GetQualifications() {
    this.qualification.GetQualifications();
  }

  UpdateQualification() {
    this.qualification.UpdateQualification();
  }

  DeleteQualification() {
    this.qualification.DeleteQualification();
  }
}

class CRUD_QUALIFICATION_DB {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  CreateQualification() {
    const data = this.req.body;
    connection.query(
      "insert into qualification set ? ",
      {
        qualification: data.qualification,
        qualification_desc: data.qualification_desc,
      },
      (err, result, fields) => {
        if (err) {
          return this.res.status(400).json(err);
        } else {
          return this.res.status(201).json({
            message: "qualification has been created successfully",
          });
        }
      }
    );
  }

  GetQualification() {
    const { id } = this.req.params;
    connection.query(
      "select * from qualification where ? ",
      { qualification_id: id },
      (err, result, fields) => {
        if (result[0]) {
          return this.res.status(200).json(result[0]);
        } else {
          return this.res.status(404).json({
            message: "qualification not found",
          });
        }
      }
    );
  }

  GetQualifications() {
    connection.query(
      "select * from qualification inner join job_qualifications on qualification.qualification_id = job_qualifications.qualification_id",
      (err, result, fields) => {
        if (err) console.log(err);
        return this.res.status(200).json(result);
      }
    );
  }

  UpdateQualification() {
    const { id } = this.req.params;
    const data = this.req.body;

    connection.query(
      "update qualification set ? where ? ",
      [
        {
          qualification: data.qualification,
          qualification_desc: data.qualification_desc,
        },
        { qualification_id: id },
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "failed to update the qualification" });
        } else {
          return this.res.status(200).json("qualification updated");
        }
      }
    );
  }

  DeleteQualification() {
    const { id } = this.req.params;
    connection.query(
      `delete from job_qualifications where qualification_id in (${id})`,
      (err, result, fields) => {
        if (err) throw this.res.status(500).send(err);
      }
    );
    connection.query(
      "delete from qualification where ?",
      { qualification_id: id },
      (err, result) => {
        if (err) {
          return this.res.status(500).json({
            err,
            message: "failed to delete the qualification",
          });
        } else {
          return res
            .status(200)
            .json({ message: "qualification has been deleted successfully" });
        }
      }
    );
  }
}
class GET_QUALIFICATIONS {
  GetQualifications() {
    connection.query(
      "select * from qualification inner join job_qualifications on qualification.qualification_id = job_qualifications.qualification_id",
      (err, result, fields) => {
        if (err) console.log(err);
        return this.res.status(200).json(result);
      }
    );
  }
}
module.exports = {
  QUALIFICATION_DB,
  CRUD_QUALIFICATION_DB,
  // GET_QUALIFICATIONS,
};
