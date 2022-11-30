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

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    fathername: String,
    dob: String,
    rollnumber: String,
    school: String,
    standard: String,
    email: String,
    password: String
});

const userModel = mongoose.model('user',userSchema);


//-------- CONNECT to database -------------//
mongoose.connect(mongoURI,(err,client)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to Database!");
    }
});



//-------- DISCONNECT database -------------//
function disconnectFromDatabase(){
    db.close();
    console.log("Disconnected From Database!");
}

app.post('/login',(req,res)=>{

    let { email, password } = req.body;

    userModel.findOne({'email':email},(err,data)=>{   
        if(data){
            //console.log(data);
            if(data['password']==password){
                return res.status(200).send({
                    success: true,
                    user : data,
                })
            }else{
                return res.status(400).send({
                    success: false,
                })
            }
        }else{
            return res.status(404).send({
                success: false,
            })
        }
    });

})

app.post('/signup',(req ,res)=>{
    console.log(req.body);
    let { firstname, lastname, fathername, dob, rollnumber, school, standard, email, password } = req.body;

    const user = new userModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        fathername: fathername,
        dob: dob,
        rollnumber: rollnumber,
        school: school,
        standard: standard,
        email: email,
        password: password
    })
    userModel.find({'email':email},(err,data)=>{
        if(data.length>0){
            return res.status(200).send({
                success: false,
            })
        }else{
            db.collection('users').insertOne(user,(err)=>{
                if(err){
                    console.log(err);
                }
                return res.status(200).send({
                    success: true,
                    data: user,
                })
            })   
        }     
    });
    
})

//--------*START* FETCH ALL RECORDS------------//
async function fetchAllEntries(){
    loginModel.find({}, function(err, data){
        console.log(">>>> ", data );
    });
}

//--------SAVE LOGIN INFO---------------//
async function saveOneLogin(){
    
}


