const router = require("express").Router();
const AUTH = require("../middleware/Auth");
const auth = new AUTH();

const USER = require("../controllers/userController");
const user = new USER();

router.get("/", user.getApplicants());

router.get("/:user_id", user.getApplicant());

//* fucntion add new applicant to DB
router.post("/", user.addNewUser());

//* change(update) status of applicant in DB
router.put("/:user_id", user.updateUser());

//* delete the row of employ id from DB
router.delete("/:user_id", user.deleteUser());

module.exports = router;
