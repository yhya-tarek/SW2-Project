const router = require("express").Router();
const AUTH = require("../middleware/Auth");
const auth = new AUTH();
const QUALIFICATION = require("../controllers/qualificationController");
const qualification = new QUALIFICATION();

router.get("/", qualification.getQualifications());

// CREATE QUALIFICATION
router.post(
  "/",
  auth.authLogin(),
  auth.authRole("admin"),
  qualification.createQualification()
);

//GET SPECIFIC QUALIFICATION
router.get("/:id", auth.authLogin(), qualification.getQualification());

//UPDATE QUALIFICATION
router.put(
  "/:id",
  auth.authLogin(),
  auth.authRole("admin"),
  qualification.updateQualification()
);

// DELETE QUALIFICATION
router.delete(
  "/:id",
  auth.authLogin(),
  auth.authRole("admin"),
  qualification.deleteQualification()
);

module.exports = router;
