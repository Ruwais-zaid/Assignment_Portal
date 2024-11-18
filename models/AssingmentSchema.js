import mongoose, { mongo } from "mongoose";

const AssingmentSchema = new mongoose.Schema({

    userId : {
        type:String,
        ref:'User',
        required:true
    },
    task:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        ref:'Admin',
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending',

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Assingment',AssingmentSchema);