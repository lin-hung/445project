import Mongoose,{Schema} from "mongoose"

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
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
        required:true
    }
})

module.exports=Mongoose.model("users",UserSchema)