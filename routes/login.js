const router = require("express").Router();
const CONNECTION = require("../db/connection");
const conn = new CONNECTION();
const connection = conn.Connection();
const LOGIN = require("../controllers/loginController");
const login = new LOGIN();
// router.get('/', (req, res) =>
// {
//     conn.query("select * from user", (err, result, fields) =>
//     {
//         res.json(result);
//     })
// });

// router.post('/', async (req, res) =>
// {
//     const data = req.body;
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { name: req.body.name, password: hashedPassword }
//     conn.query("insert into user set ? ",
//         {
//             user: data.user,
//             password: data.password,
//         },
//         (err, result, fields) =>
//         {
//             if (err)
//             {
//                 res.statusCode = 400;
//                 res.json(err);
//             } else
//             {
//                 res.json({
//                     message: "succes !",
//                 });
//             }

//         })

// });
router.post("/", login.loginAuth());

module.exports = router;
