const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
//Dependency Inversion

class JOBSDB {
  constructor(jobDB) {
    this.jobDB = jobDB;
  }

  CreateJob() {
    this.jobDB.CreateJob();
  }

  UpdateJob() {
    this.jobDB.UpdateJob();
  }
  DeleteJOb() {
    this.jobDB.DeleteJOb();
  }

  GetJob() {
    this.jobDB.GetJob();
  }
  GetJobs() {
    this.jobDB.GetJobs();
  }
}

class CRUD_JOBSDB {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  GetJobs() {
    const sql = ` SELECT *
                      FROM job
                      `;
    connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  CreateJob() {
    const date = new Date();
    const newData = this.req.body;
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
                  return this.res.status(500).json(err);
                } else {
                  let id = result.insertId;
                  qualification_ids.forEach((elem) => {
                    const sql = `insert into job_qualifications (qualification_id, job_id) values (${elem.qualification_id}, ${id})`;
                    connection.query(sql, (err, result) => {
                      if (err) {
                        return this.res.status(500).json(err);
                      }
                    });
                  });
                  return this.res
                    .status(201)
                    .json("job has been added successfully");
                }
              }
            );
          }
        }
      );
    }
  }

  UpdateJob() {
    const { id } = this.req.params;
    const newData = this.req.body;
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
                if (err) throw this.res.status(500).send(err);
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
                  return this.res.status(500).json(err);
                } else {
                  qualification_ids.forEach((elem) => {
                    const sql = `insert into job_qualifications (qualification_id, job_id) values (${elem.qualification_id}, ${id})`;
                    connection.query(sql, (err, result) => {
                      if (err) {
                        return this.res.status(500).json(err);
                      }
                    });
                  });
                  return this.res
                    .status(201)
                    .json("job has been updated successfully");
                }
              }
            );
          }
        }
      );
    }
  }

  DeleteJOb() {
    const { id } = this.req.params;
    connection.query(
      `delete from job_qualifications where job_id in (${id})`,
      (err, result, fields) => {
        if (err) throw this.res.status(500).send(err);
      }
    );
    connection.query(
      "delete from job where ?",
      { job_id: id },
      (err, result) => {
        if (err) {
          this.res.status(500).json({
            message: "failed to delete the job",
          });
        } else {
          this.res
            .status(200)
            .json({ messge: "job has been deleted successfully" });
        }
      }
    );
  }

  GetJob() {
    const { job_id } = this.req.params;
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
  }
}

// class GET_JOBS {
//   GetJobs() {
//     const sql = ` SELECT *
//                   FROM job
//                   `;
//     connection.query(sql, (err, data) => {
//       if (err) return res.json(err);
//       return res.json(data);
//     });
//   }
// }
module.exports = { JOBSDB, CRUD_JOBSDB };
// module.exports = GET_JOBS;
