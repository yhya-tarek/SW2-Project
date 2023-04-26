const router = require("express").Router();
const { USERAUTH, Auth } = require("../middleware/Auth");
const auth = new USERAUTH(new Auth());

const { SKILL, CRUD_SKILL } = require("../controllers/skillcontorller");
const skill = new SKILL(new CRUD_SKILL());

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
