const { JOBSDB, CRUD_JOBSDB } = require("../models/JobsDB");

//Dependancy Inversion

class JOBS {
  constructor(jobs) {
    this.jobs = jobs;
  }

  createJob() {
    return this.jobs.createJob();
  }

  updateJob() {
    return this.jobs.updateJob();
  }

  deleteJob() {
    return this.jobs.deleteJob();
  }

  getJob() {
    return this.jobs.getJob();
  }
  getJobs() {
    return this.jobs.getJobs();
  }
}

class CRUD_JOBS {
  constructor() {}

  getJobs = () => {
    return (req, res) => {
      const jobsDB = new JOBSDB(new CRUD_JOBSDB(req, res));
      jobsDB.GetJobs();
    };
  };

  createJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB(new CRUD_JOBSDB(req, res));
      jobsDB.CreateJob();
    };
  }

  updateJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB(new CRUD_JOBSDB(req, res));
      jobsDB.UpdateJob();
    };
  }

  deleteJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB(new CRUD_JOBSDB(req, res));
      jobsDB.DeleteJob();
    };
  }

  getJob() {
    return (req, res) => {
      const jobsDB = new JOBSDB(new CRUD_JOBSDB(req, res));
      jobsDB.GetJob();
    };
  }
}

module.exports = { JOBS, CRUD_JOBS };
