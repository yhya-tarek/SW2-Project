const JOBSDB = require("../models/JobsDB");

//Dependancy Inversion

class JOBS {
  constructor(user) {
    this.stripe = new CRUD_JOBS(user)
  }

  Create_Job() {
    this.stripe.createJob()
  }

  Update_Job() {
    this.stripe.updateJob()
  }

  delete_Job() {
    this.stripe.deleteJob()
  }

  Get_Job() {
    this.stripe.getJob()
  }

}

class CRUD_JOBS {
  constructor(user) {
    this.user = user
  }

  createJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.CreateJob(req, res);
    };
  };

  updateJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.UpdateJob(req, res);
    };
  };

  deleteJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.DeleteJob(req, res);
    };
  };

  getJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.GetJob(req, res);
    };
  };
}

///////DEPENDANCY INJECTION/////////////

class GET_JOBS {
  getJobs = () => {
    return (req, res) => {
      const jobsDB = new JOBSDB();
      jobsDB.GetJobs(req, res);
    };
  };
}

module.exports = JOBS;
module.exports = GET_JOBS;
