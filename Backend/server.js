const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    database: "SignUp"
})

app.post('/sign-up',(req, res) => {
    const sql = "INSERT INTO SignUp ('firstName','lastName','phoneNumber','email','password') VALUES (?)"
    const userInput =[
        req.body.firstName,
        req.body.lastName,
        req.body.phoneNumber,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [userInput], (err, data) => {
        if (err){
            return res.json("Error");
        }
        return res.json(data);
    })

})

app.listen(3307,()=> {
    console.log("listening");


})