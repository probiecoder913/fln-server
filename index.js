const express = require("Express");
const mongoclient = require('mongodb');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
mongoURI = "mongodb+srv://ankit913:ankit913@cluster0.wu1svov.mongodb.net/fln-test";
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Listening on PORT: "+ PORT);
});

app.get('/',(req,res) => {
    res.send('App Works !');
});



const Schema = new mongoose.Schema({
    email: String,
    password: String
});

const loginModel = mongoose.model('login',Schema);

mongoose.connect(mongoURI,(err,client)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to Database!");
        fetchAllEntries();
        //saveOneLogin();
    }
});

//--------*START* FETCH ALL RECORDS------------//
async function fetchAllEntries(){
    loginModel.find({}, function(err, data){
        console.log(">>>> " + data );
    });
}

//--------SAVE LOGIN INFO---------------//
async function saveOneLogin(){
    const login = new loginModel({
        email:'ankitfake913@gmail.com',
        password:'12345678'
    })
    db.collection('logins').insertOne(login,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Record Inserted!");
            }
    })
}


