
const express = require('express');
// const session = require('session');
const multer = require('multer');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url="mongodb://0.0.0.0:27017/task"
const client=new MongoClient(url);
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/public/views'));
//========================================================================================1
// //1)count the number of times a user visits a web page.Do this using session

// app.use(session({
//     secret: "thisismysecretkey",
//     saveUninitialized: true,
//     resave: true
// }))

// var sessions;
// let visit;

// app.get('/', (req, res) => {
//     sessions=req.session;
//     console.log(sessions);
//     if(!visit){
//         visit=1;
//     }
//     else{
//         visit +=1;
//     }

// res.send(`count${visit}`)

//  });


//=====================================================================2
//2)using multer store the file by checking  the type of file .If the file type is image then 
//upload the file in image folder otherwise upload it in files folder.Your image file type should be only png.Save all the files in mongodb

console.log(path.extname,"path------");
client.connect()
.then(() =>{
    console.log("connected to the restaurants collections")
})
const DB=client.db("task");
const coll=DB.collection("task2");
const multerstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (path.extname(file.originalname) === '.jpg') {
            console.log("jpg not saved")
            cb(new Error("error"),false); 
            
        } else if (path.extname(file.originalname) === '.png') {
            console.log("png saved")
            cb(null,'uploads');
        }else if (path.extname(file.originalname) === '.jpeg') {
            console.log("jpeg not saved")
            cb(new Error("error"),false); 
            
        }
         else {
            cb(null,'upload');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.originalname}`);
    }
});
const upload=multer({storage:multerstorage});


app.get('/', (req, res) => {
    res.render('login');
});

app.post('/upload',upload.single("myfile"),(req, res) => {
console.log(req.file);
res.send("File uploaded!");

coll.insertOne({user:req.file})
.then(()=>{
    console.log("inserted file!");
})
.catch(err =>{
    console.log(err);
});
res.send("File uploaded!");
});

//=============================================================================================

app.listen(8000, () => {
    console.log('Listening on port 8000');
});





