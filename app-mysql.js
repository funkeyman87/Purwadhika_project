const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'express_database_api'
})

db.connect();

app.post('/customer', (req,res) => {
    let sql = "INSERT INTO customer SET ?";
    let sql2 = "SELECT id FROM customer where email=?"
    let data = req.body;
    let email = req.body.email;
    db.query(sql2,email,(err,result) => {
        if(err){
            console.log(err)
        }
        if(result.length > 0){
            res.send({
                message : "email sudah terdaftar",
                result : result
            })
        }
        else{
            db.query(sql,data,(err,result) => {
                if (err){
                    console.log(err);
                    res.send({
                        message: "error",
                        result: []
                    });
                }
                else{
                    res.send({
                        message: "success",
                        result: result
                    });
                }
            })
        }
    })
});



app.post('/cart', (req,res) => {
    let sql = "INSERT INTO cart SET ?"
    let data = req.body;
    db.query(sql,[data],(err,result) => {
        if (err){
            console.log(err);
            res.send({
                message: "error",
                result: []
            });
        }
        res.send({
            message: "success",
            result: result
        });
    })
})

app.listen(3000,() => {
    console.log("server aktif di port 3000")
});