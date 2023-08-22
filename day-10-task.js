
const express=require ("express");
const bodyParser=require("body-parser");
const path = require('path');
const app=express();
const MongoClient = require("mongodb").MongoClient
const ObjectId=require("mongodb").ObjectId
const client=new MongoClient("mongodb://0.0.0.0:27017/mydb");
client.connect()
.then(()=>{
  console.log("connected");
})

const db=client.db("mydb");
var coll=db.collection("mon");

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/src/public/','views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
  coll.find({}).toArray()
    .then((data)=>{
      res.render("index",{data:data})
    }).catch((err)=>{
      console.log(err)
    });

    app.post('/', (req, res) =>{
      const users={name:req.body.name}
        coll.insertOne(users)
        .then(()=>{
          res.redirect("/")
        }).catch((err)=>{
          console.log(err)
        })
    })

})
app.get("/:id", (req, res)=>{
    var id = req.params.id;
    var o_id=new ObjectId(id);
    coll.deleteOne({_id:o_id})
      .then(()=>{
        res.redirect("/");
      }).catch((err)=>{
        console.log(err)
      })
    
  })
app.get("/edit/:id", (req, res)=>{
  var id = req.params.id
  var obj_id=new ObjectId(id);
  coll.find({_id:obj_id}).toArray()
  .then((data)=>{
    res.render("edit",{data:data})
  }).catch((err)=>{
    console.log(err)
  });
});

app.post("/edit", (req, res)=>{
  coll.updateOne({_id:new ObjectId(req.body._id)},{$set:{
    name:req.body.name,

  }})
  .then(()=>{
    res.redirect("/");
  }).catch((err)=>{
    console.log(err)
  })
})



app.listen(8000,() => {
  console.log("server is running");
});

//-----------------------------------------index.ejs-----

// {/* <form method="post" action="/">
//     <h1>TODO LIST</h1>
//     <input type="text" name="name" required>
//     <input type="submit" value="Submit">
// </form>
// <% data.forEach((item) => {%>
//     <h1><%= item.name %></h1>
//     <a href="/edit/<%=item._id%>">Edit</a>
//     <a href="/<%=item._id%>">Delete</a>
// <%})%></input> */}




//------------------------------------------------------edit.js-----------------------




// <form method="post" action="/edit">
//   <input type="text" name="name" value="<%= data[0].name%>"><br/>
//   <input type="hidden" name="_id" value="<%= data[0]._id%>"><br/>
//   <input type="submit" value="Submit">
// </form>
