const router = require("express").Router();
const skill = require("../routes/skill");
const request = require("../routes/request");
const jobs = require("../routes/jobs");
const user = require("../routes/user");
const qualifications = require("../routes/qualifications");

//* fucntion read all applicant from DB

router.use("/users", user);

router.use("/qualifications", qualifications);

router.use("/requests", request);

router.use("/jobs", jobs);

router.use("/skills", skill);

module.exports = router;
