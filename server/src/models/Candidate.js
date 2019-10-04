import Mongoose, {Schema} from 'mongoose'
const CandidateSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    testContents:{
        type:String
    }
})
module.exports=Mongoose.model("candidates",CandidateSchema)