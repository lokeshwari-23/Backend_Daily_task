
//================================================================1
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post('/',(req,res)=>{
    var name=req.body.name;
    var salary=req.body.salary;
    if(!name && !salary){
        res.status(404).send('error')
    }else{
        res.status(200).send('success')
    }

})


    
//======================================================================2
app.post("/search/:name/:age", (req, res) => {
        const name = req.params.name;
        const age = req.params.age;
    
        const isAlpha = /^[a-zA-Z]+$/.test(name); 
        const isNumeric = /^[0-9]+$/.test(age); 
    
        if (!isAlpha) {
            res.send("Enter only alphabetic characters for the name.");
        } else if (!isNumeric) {
            res.send("Enter only numeric characters for the age.");
        } else {
            res.send(`Name: ${name}, Age: ${age}`);
        }
    });


    app.listen(8080,()=>{
        console.log('server is running');
        })