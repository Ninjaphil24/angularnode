const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection

const db =mysql.createConnection({
    host:'eu-cdbr-west-03.cleardb.net',
    user: 'baaaf2adc6f7c6',
    password:'15b21c52',
    database:'heroku_230984791d3e78e',
    port: 3306
    // host:'localhost',
    // user: 'root',
    // password:'',
    // database:'simpledb',
    // port: 3306
});

// check database Connection

db.connect(err=>{
    if (err) {console.log(err, 'dberr');}
    console.log('database connected...');
})

// get all data

app.get('/user',(req,res)=>{

    let qr='select * from user'
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            })
        }
    });
})

// get single data
app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;
    let qr = `select*from user where id = ${gID}`

    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
                message: 'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message: 'data not found'
            });
        }
    });
});

app.post('/user',(req,res)=>{
    console.log(req.body, 'createdata');

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `insert into user(fullname,email,mobile) values('${fullName}','${eMail}','${mb}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message: 'Data inserted'
        });
       
    });
});

// update single data
app.put('/user/:id',(req,res)=>{
    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    
    let qr = `update user set fullname = '${fullName}', email = '${eMail}', mobile = '${mb}' where id = '${gID}'`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message:'Data updated'
        });
    });
    
});

// delete single data

app.delete('/user/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `delete from user where id = '${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send(
            {
                message: 'Data deleted'
            }
        )
    });
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Server is running ${process.env.PORT || 3000}`);
});

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("build"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//     });
//   }