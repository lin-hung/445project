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
    isEmployer:{
        type:Boolean,
        required:false
    }
})

module.exports=Mongoose.model("users",UserSchema)