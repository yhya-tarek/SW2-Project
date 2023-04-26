const router = require("express").Router();
const { USERAUTH, Auth } = require("../middleware/Auth");
const auth = new USERAUTH(new Auth());

const { USER, CRUD_USER } = require("../controllers/userController");
const user = new USER(new CRUD_USER());

router.get("/", user.getApplicants());

router.get("/:user_id", user.getApplicant());

//* fucntion add new applicant to DB
router.post("/", user.addNewUser());

//* change(update) status of applicant in DB
router.put("/:user_id", user.updateUser());

//* delete the row of employ id from DB
router.delete("/:user_id", user.deleteUser());

module.exports = router;
