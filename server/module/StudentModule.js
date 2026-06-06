import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
        name:{
                type:String,
                required : true
        },
        email:{
                type:String,
                required : true
        },
        mobile:{
                type:String,
                required : true
        },
        createdAt:{
                type:String,
                required : true
        }
})

export default mongoose.model("Students", studentSchema)