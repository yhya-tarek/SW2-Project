const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();

class QUALIFICATION {
  getQualifications = () => {
    return (req, res) => {
      connection.query(
        "select * from qualification inner join job_qualifications on qualification.qualification_id = job_qualifications.qualification_id",
        (err, result, fields) => {
          if (err) console.log(err);
          return res.status(200).json(result);
        }
      );
    };
  };

  createQualification = () => {
    return (req, res) => {
      const data = req.body;
      connection.query(
        "insert into qualification set ? ",
        {
          qualification: data.qualification,
          qualification_desc: data.qualification_desc,
        },
        (err, result, fields) => {
          if (err) {
            return (res.statusCode = 400);
            return res.json(err);
          } else {
            return res.json({
              message: "qualification has been created successfully",
            });
          }
        }
      );
    };
  };

  getQualification = () => {
    return (req, res) => {
      const { id } = req.params;
      connection.query(
        "select * from qualification where ? ",
        { qualification_id: id },
        (err, result, fields) => {
          if (result[0]) {
            return res.status(200).json(result[0]);
          } else {
            return res.status(404).json({
              message: "qualification not found",
            });
          }
        }
      );
    };
  };

  updateQualification = () => {
    return (req, res) => {
      const { id } = req.params;
      const data = req.body;

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
            return res.status(200).json("qualification updated");
          }
        }
      );
    };
  };

  deleteQualification = () => {
    return (req, res) => {
      const { id } = req.params;
      connection.query(
        `delete from job_qualifications where qualification_id in (${id})`,
        (err, result, fields) => {
          if (err) throw res.status(500).send(err);
        }
      );
      connection.query(
        "delete from qualification where ?",
        { qualification_id: id },
        (err, result) => {
          if (err) {
            return res.status(500).json({
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
    };
  };
}
module.exports = QUALIFICATION;
