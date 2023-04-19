const router = require("express").Router();
const AUTH = require("../middleware/Auth");
const auth = new AUTH();

const SKILL = require("../controllers/skillcontorller");
const skill = new SKILL();

router.get("/", skill.getSkills());

router.get("/:user_id", skill.getSkill());

router.post(
  "/",
  auth.authLogin(),
  auth.authRole("admin"),
  skill.createSkills()
);

router.delete(
  "/:skill_id",
  auth.authLogin(),
  auth.authRole("admin"),
  skill.deleteSkill()
);

module.exports = router;
