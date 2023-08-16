//===============================================================================1
//fetch the data from a collections and write it to a text file

const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url="mongodb://0.0.0.0:27017/task"
const client=new MongoClient(url);
const fs=require('fs');
const app = express();

client.connect(url).then(()=>
{
    const DB=client.db("task");
    const coll=DB.collection("task1");
    coll.find({}).toArray().then((val)=>{


    fs.writeFile('data.txt',JSON.stringify(val),(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
             console.log("respect")
        }
    })
})


})
app.listen(8080,()=>{
    console.log("listening on port 8080!!!!!!!!!!!");
})

//=======================================================================1




const express = require('express');
const  MongoClient = require('mongodb').MongoClient;
const  ObjectId = require('mongodb').ObjectId;

const url = "mongodb://0.0.0.0:27017/task";
const client = new MongoClient(url);
const app = express();

client.connect().then(() => {
    console.log("Connected to Mongodb");
    const db = client.db("task");
    const coll = db.collection('task2');


    app.get('/create/:name/:salary', (req, res) => {
        
        var Name = req.params.name;
        var Salary = req.params.salary;
        const obj = { name: Name, salary: Salary};
        coll.insertOne(obj).then(() => {
            console.log("Inserted successfully");
        });
        res.send("Homepage1");
    });

    app.get('/read', (req, res) => {
        res.send("Homepage2");
        const obj_id = new ObjectId("64d9f9f26320f36e3f58899c");
        coll.find({ _id: obj_id }).toArray().then((val) => {
            console.log(val);
        });
    });

    app.get('/update', (req, res) => {
        res.send("Homepage3");
        const obj_id = new ObjectId("64d9f9f26320f36e3f58899c");
        coll.updateOne(
            { _id: obj_id },
            { $set: { name: "karthi" } }
        ).then(() => {
            console.log("Updated");
        });
    });

    app.get('/delete', (req, res) => {
        res.send("Homepage4");
        const obj_id = new ObjectId("64d9f9f26320f36e3f58899c");
        coll.deleteOne({ _id: obj_id }).then(() => {
            console.log("Deleted");
        });
    });

    app.listen(3000, () => {
        console.log('Server is running!');
    });
}).catch(err => {
    console.error('err', err);
});


// write a MongoDB query to find the higesht score for restaurants
//db.restaurants.aggregate([{$group:{_id:"$name",max:{$max:{$max:"$grades.score"}}}}])

//===========================================================================================

//write a MongoDB query to find the lowest score for each restaurants
//db.restaurants.aggregate([{$group:{_id:"$name",min:{$min:{min:{$min:"$grades.score"}}}}}])

//==========================================================================================

//write a MongoDB query to find the count of restaurants in each borough
//db.restaurants.aggregate({$group:{_id:"$borough",sum:{$sum:1}}})

//===========================================================================================

//write a MongoDB query to find the count of restaurants that receive grade of A for each cuisine.
//db.restaurants.aggregate({$match:{"grades.grade":"A"}},{$group:{_id:"$cuisine",sum:{$sum:1}}})

























