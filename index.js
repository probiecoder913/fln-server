const express = require("Express");
const mongoclient = require('mongodb');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("CORS")

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

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

app.post('/sendToDb',(req,res)=> {

    var { email, password } = req.body
    //console.log(email, password);

    mongoose.connect(mongoURI,(err,client)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connected to Database!");
            //fetchAllEntries();
            //saveOneLogin();
        }
    });

    const login = new loginModel({
        email: email,
        password: password
    })

    db.collection('logins').insertOne(login,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Record Inserted!");
            }
    })
    //return res.status(200)
    return res.status(200).send({
        success: true
    })
})
//--------*START* FETCH ALL RECORDS------------//
async function fetchAllEntries(){
    loginModel.find({}, function(err, data){
        console.log(">>>> " + data );
    });
}

//--------SAVE LOGIN INFO---------------//
async function saveOneLogin(){
    
}


