const router = require("express").Router();
const AUTH = require("../middleware/Auth");
const auth = new AUTH();

const REQUEST = require("../controllers/requestController");
const request = new REQUEST();
//GET REQUESTS
router.get("/", request.getRequests());

//GET REQUEST
router.get("/:user_id", request.getRequest());

//CREATE REQUEST
router.post("/", request.sendRequest());

//RESPOND TO A REQUEST
router.put("/:user_id&:job_id", request.respondToRequest());

//DELETE REQUEST
router.delete("/:user_id&:job_id", request.deleteRequest());

module.exports = router;
