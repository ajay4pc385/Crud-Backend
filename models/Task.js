const mongoose = require("mongoose");

const taskSchema =  new mongoose.Schema (
    {
        Name: {type: String, required: true}, 
        Email: {type: String, required: true},
   
   
    },
    {
        timestamps : true
    }
);

const Task = mongoose.model("task", taskSchema);

module.exports=Task;
