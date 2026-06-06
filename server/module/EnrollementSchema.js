import mongoose from "mongoose"

const EnrollementSchema = new mongoose.Schema({
        studentid:{
                type:mongoose.Schema.Types.ObjectId,
                ref : "Students"
        },
        courseid:{
                type:mongoose.Schema.Types.ObjectId,
                ref : "Courses"
        },
        EnrollementDate:{
                status:{
                        type:String,
                         required : true,
                         enum : ["Active", "Completed"]
                },
                required : true
        },
        
})


export default mongoose.model("Enrollements", EnrollementSchema)