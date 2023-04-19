const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
// getJobs = ()=>{return(req, res) => {
//   connection.query("select * from job", (err, result, fields) => {
//     res.json(result);
//   });
// },

// getJob = ()=>{return(req, res) => {
//   const { id } = req.params;
//   connection.query(
//     "select * from job where ? ",
//     { job_id: id },
//     (err, result, fields) => {
//       if (result[0]) {
//         res.json(result[0]);
//       } else {
//         res.statusCode = 404;
//         res.json({
//           message: "job not found",
//         });
//       }
//     }
//   );
// },
class JOBS {
  getJobs = () => {
    return (req, res) => {
      const sql = ` SELECT *
                  FROM job
                  `;
      connection.query(sql, (err, data) => {
        if (err) return res.json(err);

        // for (const k in data) {
        //   const copydata = Object.keys(data[k])
        //     .filter((key) => key.includes("qualification"))
        //     .reduce((cur, key) => {
        //       return Object.assign(cur, { [key]: data[k][key] });
        //     }, {});
        //   console.log(data);
        //   delete data[k].qualification;
        //   delete data[k].qualification_id;
        //   delete data[k].qualification_desc;
        //   data[k].qualifications = copydata;
        // }
        return res.json(data);
      });
    };
  };

  getJob = () => {
    return (req, res) => {
      const { job_id } = req.params;
      const sql = ` SELECT *
                  FROM job
                  INNER JOIN job_qualifications 
                      ON job.job_id=job_qualifications.job_id
                  INNER JOIN qualification 
                      ON job_qualifications.qualification_id=qualification.qualification_id
                      where job.job_id = ${job_id}`;
      connection.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    };
  };

  createJob = () => {
    return (req, res) => {
      const date = new Date();
      const newData = req.body;
      let qualification_ids = [];
      for (let i = 0; i < newData.qualification.length || i === 0; i++) {
        connection.query(
          `select qualification_id from qualification where qualification = "${newData.qualification[i]}"`,
          (err, result, fields) => {
            qualification_ids[i] = result[0];
            qualification_ids = qualification_ids.filter((elem) => {
              return elem != null;
            });
            if (i >= newData.qualification.length - 1) {
              connection.query(
                "insert into job set ? ",
                {
                  companyName: newData.companyName,
                  position: newData.position,
                  Description: newData.Description,
                  offer: newData.offer,
                  max_candidate_number: newData.max_candidate_number,
                  actualCandidateNum: 0,
                  creation_date: date.toISOString().slice(0, 10),
                },
                (err, result, fields) => {
                  if (err) {
                    return res.status(500).json(err);
                  } else {
                    let id = result.insertId;
                    qualification_ids.forEach((elem) => {
                      const sql = `insert into job_qualifications (qualification_id, job_id) values (${elem.qualification_id}, ${id})`;
                      connection.query(sql, (err, result) => {
                        if (err) {
                          return res.status(500).json(err);
                        }
                      });
                    });
                    return res
                      .status(201)
                      .json("job has been added successfully");
                  }
                }
              );
            }
          }
        );
      }
    };
  };

  updateJob = () => {
    return (req, res) => {
      const { id } = req.params;
      const newData = req.body;
      let qualification_ids = [];
      for (let i = 0; i < newData.qualification.length || i === 0; i++) {
        connection.query(
          `select qualification_id from qualification where qualification = "${newData.qualification[i]}"`,
          (err, result, fields) => {
            qualification_ids[i] = result[0];
            qualification_ids = qualification_ids.filter((elem) => {
              return elem != null;
            });
            if (i >= newData.qualification.length - 1) {
              connection.query(
                `delete from job_qualifications where job_id in (${id})`,
                (err, result, fields) => {
                  if (err) throw res.status(500).send(err);
                }
              );
              connection.query(
                "update job set ? where ?",
                [
                  {
                    position: newData.position,
                    Description: newData.Description,
                    offer: newData.offer,
                    max_candidate_number: newData.max_candidate_number,
                  },
                  { job_id: id },
                ],
                (err, result, fields) => {
                  if (err) {
                    return res.status(500).json(err);
                  } else {
                    qualification_ids.forEach((elem) => {
                      const sql = `insert into job_qualifications (qualification_id, job_id) values (${elem.qualification_id}, ${id})`;
                      connection.query(sql, (err, result) => {
                        if (err) {
                          return res.status(500).json(err);
                        }
                      });
                    });
                    return res
                      .status(201)
                      .json("job has been updated successfully");
                  }
                }
              );
            }
          }
        );
      }
    };
  };

  deleteJob = () => {
    return (req, res) => {
      const { id } = req.params;
      connection.query(
        `delete from job_qualifications where job_id in (${id})`,
        (err, result, fields) => {
          if (err) throw res.status(500).send(err);
        }
      );
      connection.query(
        "delete from job where ?",
        { job_id: id },
        (err, result) => {
          if (err) {
            res.status(500).json({
              message: "failed to delete the job",
            });
          } else {
            res
              .status(200)
              .json({ messge: "job has been deleted successfully" });
          }
        }
      );
    };
  };
}

module.exports = JOBS;
