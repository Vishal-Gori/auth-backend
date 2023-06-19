const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(express.json())

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud",
    insecureAuth : true
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username=? AND password=?;";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        console.log(err);
        if(err) return res.json("Login Failed");
        return res.json(data);
    })
});

app.post('/signup',(req,res)=>{
    const sql = "INSERT INTO `login` (`username`, `password`) VALUES (?, ?);";
    const value =[
        req.body.username,
        req.body.password
    ];
    db.query(sql,[value],(err,data)=>{
        if(err) return res.status(400).json({
            status:'fail',
            err
        })
        else    return res.status(200).json({
            status:'success',
            message:'User created successfully'
        })
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening... ${port}`)
})