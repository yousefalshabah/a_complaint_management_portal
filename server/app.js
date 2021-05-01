const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require("mysql")

const SECRET_KEY = "random";

const DB = mysql.createPool({
    host: "freedb.tech",
    user: "freedbtech_pwcTask",
    password: "pwc2021",
    database: "freedbtech_pwcTask"
})
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

const port = 3001


app.post('/signup', (req, res) => {
    var pass = req.body.password;
    var email = req.body.email;
    var role = req.body.role
    var hashPass = bcrypt.hashSync(pass, 3);

    checkEmailExistsQry = "SELECT * FROM `user_info` WHERE name = ?"
    DB.query(checkEmailExistsQry, [email], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.length > 0) {

            return res.send("E-mail address are used")
        } else {
            const createUserQry = "INSERT INTO `user_info` (`name`,`role`, `password`,`phone_number` ) VALUES (?,?,?,?);"
            const params = [email, role, hashPass, 123]
            DB.query(createUserQry, params, (err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send("new user added successfully ")
            })
        }
    })

})


app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;


    checkEmailExistsQry = "SELECT * FROM `user_info` WHERE name = ?"
    DB.query(checkEmailExistsQry, [email], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.length === 0) {
            return res.send("E-mail address dose note exists")
        } else {
            const existingHashedPassword = result[0].password;
            bcrypt.compare(password, existingHashedPassword).then(function (isMatching) {

                if (isMatching) {
                    const token = jwt.sign({
                        email: result[0].name
                    }, SECRET_KEY, {
                        expiresIn: 1000
                    });

                    return res.send({
                        token: token,
                        user_role: result[0].role
                    });
                } else {
                    return res.status(401).send({
                        error: 'Wrong password'
                    });
                }
            });
        }

    })
});


app.get("/", (req, res) => {

    selectQry = "SELECT * FROM `user_info`"
    const qry = "INSERT INTO `user_info` (`name`, `phone_number`,`role`, `password`) VALUES ('mohammad', '654321 ','customer' ,'654321');"
    // res.send(qry)
    DB.query(selectQry, (err, result) => {
        if (err) {
            return res.send(err)
        }
        res.send(result)
    })
})





app.listen(port, () => {
    console.log("hello amman we are on port " + port)
})