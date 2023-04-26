const router = require("express").Router();
const { USERAUTH, Auth } = require("../middleware/Auth");
const auth = new USERAUTH(new Auth());

const { REQUEST, CRUD_REQUEST } = require("../controllers/requestController");
const crud_request = new CRUD_REQUEST();
const request = new REQUEST(crud_request);
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
