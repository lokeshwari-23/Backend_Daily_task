// create a blog App using mongodb and nodejs
// 1.A guest user can read all the blogs but cannot comment on it.
// 2.create an Admin Login.The admin login cannot be accessed by an user.
// 3.user will be able to see all the blogs, they can comment on the blogs.
// 4.Admin can create blogs,upload images on the blogs,upload files on the blog.
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url='mongodb://0.0.0.0:27017/task'
const Client= new MongoClient(url);
const path= require('path');
const { Console } = require('console');
const app = express();
const ObjectId=require('mongodb').ObjectId;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname+'/src/public/','view'));

 Client.connect(url).then(()=>
 {
    console.log('connected')
 })
 const DB=Client.db("task");
 const adder=DB.collection('blogs')
 const update=DB.collection('blog_user');
 const finder=DB.collection('blog_comments');
 const multer=require('multer');

 app.use(express.static('src/public/images'))
const multerStorage=multer.diskStorage({
    destination: (req,file,cb)=>
    {   
        
         cb(null,path.join(__dirname,'/src/public/','images'))
      
    },
    filename: (req,file,cb)=>
    {
        cb(null,`${file.originalname}`)
    }
});
const upload = multer({storage:multerStorage}).single("myfile")

app.post('/file_upload',function(req,res){
    upload(req,res,function(err) {
       var title=req.body.addtitle;
       var content=req.body.addcontent;
       var img=req.file.originalname;
        adder.insertOne({Title:title,Subject:content,Img:img}).then(()=>{
            console.log("data inserted successfully")
            res.redirect("/");
        })
    });});

app.post('/deletecontent',(req,res)=>{
    adder.find({}).toArray().then((data)=>
    {
        res.render('deletefiles',{data:data})
    })
    
})
app.post('/editblog',(req,res)=>{
    var edittitle=req.body.editer;
    var id=req.body.yellow;
    res.render('edituser',{element:edittitle})
  })
app.post('/editcontent',(req,res)=>{
    adder.find({}).toArray().then((data)=>
    {
        res.render('editfiles',{data:data})
    })    
})
app.post('/updatechanges',(req,res)=>{
    var userchange=req.body.changeval;
    var  title=req.body.changedtitle;
    var content=req.body.changecontent;
    console.log(userchange,title)
    adder.updateOne({Title:userchange},{$set:{Title:title,Subject:content}}).then(()=>{
        console.log('data updated successfully');
        res.redirect('/')
    })
    finder.updateMany({Title:userchange},{$set:{Title:title}}).then(()=>
    {
        console.log('comments updated')
    })
})
 app.post('/remove',(req,res)=>{
    var id=req.body.delete;
  const obj_id=new  ObjectId(id);
  var title=req.body.deltitle;
  console.log(title)
  finder.deleteMany({Title:title}).then(()=>
  {
    console.log('comments deleted')
  })
  adder.deleteOne({_id:obj_id}).then((pot)=>
    {
     
        console.log("successfully deleted")
        res.redirect(`/data`)
     })
 })

app.get('/:id?', (req,res)=>
{
    var name=req.params.id;
   console.log(name);

   adder.find({}).toArray().then((data)=>{
    finder.find({users:name}).toArray().then((drive)=>
    {   if(drive.length){
            console.log(drive,"drive")
            res.render('blog',{data:data,name:name,drive:drive});
        }
        else{
        res.render('blog',{data:data,name:name,drive:drive});
        }
    })
        
        }).catch((error)=>
        {
            console.log(error)
        })
      
})
app.post('/admin',(req, res)=>{
    res.render('adminlogin')
})
app.post('/addcontent',(req, res)=>{
    res.render('addfile')
});
app.post('/adminvalidation',(req, res)=>{
    var adname="lokeshwari";
    var adminpass="12345"
    var adminname=req.body.adminname;
    var adminpassword=req.body.adminpassword;
    if(adminpass==adminpassword && adminname==adname)
    {
        res.render('edit',)
    }
    else
    {
        res.send("invalid user")
    }
})
app.post('/comment',(req, res)=>{
  var id=req.body.hidden;
  var comment=req.body.username;
  console.log(comment)
  const obj_id=new  ObjectId(id);

})
app.post('/login',(req,res)=>
{
    res.render('login')
})
app.post('/validation',(req, res)=>{

    var username=req.body.username;
    var password=req.body.password;
    update.find({username:username,password:password}).toArray().then((data)=>{
         console.log(data[0]?.username)
        if(data[0]?.username===username && data[0].password===password)
    {
        res.redirect (`/${data[0].username}`)
    }
    else{
        res.send("invalid user")
    }
    })   
})
app.post('/userset',(req, res)=>{
    var num=req.body.pat;
    var named=req.body.namer;
    var comment=req.body.comment;
    var title=req.body.tiles
    finder.insertOne({blogno:num,users:named,comment:comment,Title:title}).then(()=>{
        console.log("inserted")
    });
    console.log(num,named)
    res.redirect(`/${named}`)
})
app.listen(3000,(req,res)=>
{
    console.log('listening on port 3000')
})