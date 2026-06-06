import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
        title:{
                type:String,
                required : true
        },
        category:{
                type:String,
                required : true
        },
        fees:{
                type:String,
                required : true
        },
        duration:{
                type:String,
                required : true
        },
           createdAt:{
                type:String,
                required : true
        }
})

export default mongoose.model("Courses", courseSchema)