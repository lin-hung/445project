import Mongoose, {Schema} from 'mongoose'
const UserProfileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    profileType: {
        type:String,
        required:true
    },
    testContents:{
        type:String
    }
})
UserProfileSchema.virtual('isRecruiter').get(function () {
    return this.profileType == 'recruiter'
})
UserProfileSchema.virtual('isCandidate').get(function () {
    return this.profileType == 'candidate'
})
module.exports=Mongoose.model("userProfiles",UserProfileSchema)