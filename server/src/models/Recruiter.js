import Mongoose, {Schema} from 'mongoose'
const RecruiterSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    testContents:{
        type:String
    }
})
module.exports=Mongoose.model("recruiters",RecruiterSchema)