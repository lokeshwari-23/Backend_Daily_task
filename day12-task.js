

const express= require('express');
const MongoClient = require('mongodb').MongoClient; 
const ObjectId = require('mongodb').ObjectId;
const url="mongodb://0.0.0.0:27017/task"

const client = new MongoClient(url);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname+ '/src/public', '/views'))
const DB=client.db("task");
const coll=DB.collection('orginal');
const coll1=DB.collection('orginaldb');


app.use(session({
    secret:"thisismysecretkey",
        saveUninitialized: true,
        cookie:{maxAge: 3000}
   
}))
var sessions;
app.get('/', (req, res) => {
    sessions = req.session

    if(sessions.user){
        res.send(`login sucessfully<a href="/logout">logout</a>`);
        
    }
    else{
        coll1.deleteMany({email:sessions.user}).then(()=>{
            console.log("deleted")
        })
        res.render('login')

    }
 
})

app.post('/verify', (req, res) => {
    var Email=req.body.email;
    var Password=req.body.password;
    coll.find({email:Email,password:Password}).toArray().then((data) => {
    
        if(data.length !=0) {
            sessions=req.session
            sessions.user=req.body.email
            coll1.insertOne(sessions).then(()=>{
                console.log('inserted')
            })

      
            res.send(`login sucessfully<a href="/logout">logout</a>`);
        }
        else{
            res.send("Login failed");
        }
    })
    
 
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
    
});

app.listen(8000,()=>{
    console.log("listening on 8000")
})





//------------------------------------------login.ejs
/* <form method="post" action="/verify">
    <input type="email" name="email"><br>
    <input type="password"name="password"><br>
    <input type="submit" value="login">
    
    </form> */
    