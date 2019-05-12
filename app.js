const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_database_API'
});

db.connect();

app.get('/', (req,res) => {
    res.send({
        message: "Hello World"
    })
});

// -              - \\--------------------------------------------------------------------------------------------------------------------------
// - For COSTUMER - \\--------------------------------------------------------------------------------------------------------------------------
// -              - \\--------------------------------------------------------------------------------------------------------------------------

app.get('/customer', (req,res) => {
    let sql = "SELECT * FROM customer";
    db.query(sql, (err, result) => {
        if (err){
            res.send({
                message: "error",
                result: []
            });
        }
        res.send({
            message: "success",
            result: result
        });
    });
});

app.get('/customer/:no', (req,res) => {
    let sql = "SELECT * FROM customer WHERE no=?";
    let no = req.params.no;
    db.query(sql, no, (err, result) => {
        if (err){
            res.send({
                message: "error",
                result: []
            });
        }
        res.send({
            message: "success",
            result: result
        });
    });
});

// Penggunaan Query
app.get('/query', (req,res) => {
    // declarasi variable limit, untuk limitasi penarikan data dari table
    let limit = 1000;

    // deklarasi array variable untuk dynamic binding
    let args = new Array();

    // deklarasi query
    let sql = "SELECT * FROM karyawan "; 
    
    // jika ada query "kota" didalam request
    if(req.query.kota){
        // tambahkan WHERE clause pada sql 
        sql += "WHERE kota=? "
        // push isi dari query "kota" ke dalam array
        args.push(req.query.kota);
    }
    
    // jika ada query "limit" didalam request
    if(req.query.limit){
        // ubah limit sesuai query "limit"
        limit = parseInt(req.query.limit)
    }
    // push isi dari query "limit" ke dalam array
    args.push(limit);
    // tambahkan sql untuk limit
    sql += "LIMIT ?";

    db.query(sql, args, (err, result) => {
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
    });
});

// Insert bulk customer data \\

app.post('/customer', (req,res) => {
    let sql = "INSERT INTO customer SET ?";
    db.query(sql, req.body, (err, result) => {
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
    });
});

app.delete('/karyawan/:no', (req,res) => {

});

app.put('/karyawan/:no', (req,res) => {

});

// Costumer section end here \\

// -          - \\-------------------------------------------------------------------------------------------------------------------------
// - for CART - \\ ------------------------------------------------------------------------------------------------------------------------
// -          - \\-------------------------------------------------------------------------------------------------------------------------

app.get('/cart', (req,res) => {
    let sql = "SELECT * FROM cart";
    db.query(sql, (err, result) => {
        if (err){
            res.send({
                message: "error",
                result: []
            });
        }
        res.send({
            message: "success",
            result: result
        });
    });
});

app.get('/cart/:no', (req,res) => {
    let sql = "SELECT * FROM cart WHERE no=?";
    let no = req.params.no;
    db.query(sql, no, (err, result) => {
        if (err){
            res.send({
                message: "error",
                result: []
            });
        }
        res.send({
            message: "success",
            result: result
        });
    });
});

// Penggunaan Query
app.get('/query', (req,res) => {
    // declarasi variable limit, untuk limitasi penarikan data dari table
    let limit = 1000;

    // deklarasi array variable untuk dynamic binding
    let args = new Array();

    // deklarasi query
    let sql = "SELECT * FROM cart "; 
    
    // jika ada query "kota" didalam request
    if(req.query.kota){
        // tambahkan WHERE clause pada sql 
        sql += "WHERE kota=? "
        // push isi dari query "kota" ke dalam array
        args.push(req.query.kota);
    }
    
    // jika ada query "limit" didalam request
    if(req.query.limit){
        // ubah limit sesuai query "limit"
        limit = parseInt(req.query.limit)
    }
    // push isi dari query "limit" ke dalam array
    args.push(limit);
    // tambahkan sql untuk limit
    sql += "LIMIT ?";

    db.query(sql, args, (err, result) => {
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
    });
});

app.post('/cart', (req,res) => {
    let sql = "INSERT INTO cart (email, product_id, product_name, qty, harga) VALUES ?";
    let body = req.body.cart;
    let values = [];
    body.map((v, i)=>{
        let values2 = [];
        for (let [key, value] of Object.entries(v)){
            values2.push(value);
        }
        values.push(values2);
    })
    db.query(sql, [values], (err, result) => {
        if (err){
            console.log(err);
            res.send({
                message: "You fail to insert cart",
                result: []
            });
        }
        res.send({
            message: "it is a success, congrats!",
            result: result.affectedRows
        });
    });
});

app.delete('/cart/:no', (req,res) => {

});

app.put('/cart/:no', (req,res) => {

});

// CART section end here \\


app.listen(3000, ()=> {
    console.log("server Listening On Port 3000");
});