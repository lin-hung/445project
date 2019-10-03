import Mongoose,{Schema} from "mongoose"

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    googleID:{
        type:String,
        required:false
    },
    linkedinID:{
        type:String,
        required:false
    },
    userType:{
        type:String,
        required:true
    }
})

module.exports=Mongoose.model("users",UserSchema)