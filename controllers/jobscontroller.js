const JOBSDB = require("../models/JobsDB");
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
      const jobsDB = new JOBSDB();
      jobsDB.GetJobs(req, res);
    };
  };

  getJob = () => {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.GetJob(req, res);
    };
  };

  createJob = () => {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.CreateJob(req, res);
    };
  };

  updateJob = () => {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.UpdateJob(req, res);
    };
  };

  deleteJob = () => {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.DeleteJob(req, res);
    };
  };
}

module.exports = JOBS;
