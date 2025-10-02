const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ToDoListSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("ToDoList",ToDoListSchema);