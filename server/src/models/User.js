import Mongoose,{Schema} from "mongoose"
const UserSchema=new Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String
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
    },
    candidateProfile:{
        type: Schema.Types.ObjectId,
        ref:'candidates'
    },
    recruiterProfile:{
        type: Schema.Types.ObjectId,
        ref:'recruiters'
    }
})
UserSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})
UserSchema.virtual('isRecruiter').get(function(){
    return this.userType=='recruiter'
})
UserSchema.virtual('isCandidate').get(function(){
    return this.userType=='candidate'
})
// UserSchema.virtual('candidate').get(function(){
//     try{
//         if(this.isCandidate){
//             // Candidate.populate(this,{path:'candidateProfile'},(err)=>{
//             //     console.log(`in user.js candidateProfile: ${JSON.stringify(this.candidateProfile)}`)
//             //     return this.candidateProfile
//             // },
//             // (err)=>{
//             //     throw `${err}`
//             // })
//             // var promise=this.populate('candidateProfile')
//             //     .execPopulate().then((user,err)=>{
//             //         console.log(` 
//             //         err:${JSON.stringify(err)}
//             //         this:${JSON.stringify(this)}`)
//             //         return(this.candidateProfile)
//             //     })
//             // await promise
//             const query=Candidate.find({user:this._id})
//             const c=await query.exec()
//             console.log(JSON.stringify(c))
//         }
//         throw `not a candidate: user id ${this.id}, isRecruiter: ${this.isRecruiter}`
//     }catch(e){
//         console.log(`in user.js ${e}`)
//     }
// })
module.exports=Mongoose.model("users",UserSchema)