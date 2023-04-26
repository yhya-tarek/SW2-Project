const router = require("express").Router();
const { USERAUTH, Auth } = require("../middleware/Auth");
const auth = new USERAUTH(new Auth());
const requests = require("../routes/request");
const { JOBS, CRUD_JOBS } = require("../controllers/jobscontroller");
const jobs = new JOBS(new CRUD_JOBS());

router.get("/", jobs.getJobs());

// CREATE JOB
router.post("/", auth.authLogin(), auth.authRole("admin"), jobs.createJob());

//GET SPECIFIC JOB
router.get("/:job_id", jobs.getJob());

//UPDATE JOB
router.put("/:id", auth.authLogin(), auth.authRole("admin"), jobs.updateJob());

// DELETE JOB
router.delete(
  "/:id",
  auth.authLogin(),
  auth.authRole("admin"),
  jobs.deleteJob()
);

module.exports = router;
