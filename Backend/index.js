const express=require("express");
const app=express();
const host="127.0.0.1";
const port=3000;
const cors= require('cors')
app.use(express.json());

app.use(cors());

let tasks=[];
//     {
//         id:1,
//         title:"Update Passwords",
//         desc:"Review online accounts and update passwords for better security. Use a password manager to keep track.",
//         date:"2023-11-4",
//         status:true
        
//     },
//     {
//         id:2,
//         title:"Watch a video from Fireship",
//         desc:"Enrol to That Weird JavaScript Course by Fireship.io",
//         date:"2023-11-1",
//         status:1
//     },
//     {
//         id:3,
//         title:"Weekly Review",
//         desc:"Dedicate 30 minutes every Friday to review accomplishments, assess goals,and plan for the next week.",
//         date:"2023-11-10",
//         status:0
//     }
// ];
let idx=1;

app.post("/newItem",(req,res)=>{
    const item={
        id:idx,
        title:req.body.title,
        desc:req.body.desc,
        date:req.body.date,
        status:req.body.status
    }
    idx++;
    tasks.push(item);
    console.log(item);
    res.status(201).json(item);
})

app.get("/",(req,res)=>{
    res.json(tasks);
    console.log("data send");
})

app.get("/:id",(req,res)=>{
    for(let i=0;i<tasks.length;i++){
        const item= tasks[i];
        if(item.id==req.params.id){
            res.json(item);
            return;
        }
    }
   
})

app.put('/updateTask/:id', (req, res) => {
    const updatedTask = req.body;
    console.log(updatedTask);
    updatedTask.id=req.params.id;
    tasks = tasks.map(task => (task.id == req.params.id ? updatedTask : task));  
    res.json({ message: 'Task updated successfully'});
  });


app.delete("/deleteItem/:id", (req,res)=>{
    console.log(req.params.id,'need delete')
    for(let i=0;i<tasks.length;i++){
        const item=tasks[i];
        if(item.id==req.params.id){
            tasks.splice(i,1);
            res.json(item);
            console.log(item,"delete")
            return;
        }
        res.json("not found");
    }
})

app.listen(port,host,()=>{
    console.log("Server Started");
})