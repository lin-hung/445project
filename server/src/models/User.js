import Mongoose, { Schema } from "mongoose"
import UserProfile from './UserProfile'
const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    provider:{
        type:String,
        required:true
    },
    providerId:{
        type:String,
        required:true
    }
})
UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})
UserSchema.methods.getUserProfile = function (cb) {
    return UserProfile.findOne({ user: this._id }).exec(cb)
}
UserSchema.statics.createUser=function(providerProfile, provider){
    return new this({
        firstName: providerProfile.name.givenName,
        lastName: providerProfile.name.familyName,
        email: providerProfile.emails[0].value,
        provider:provider,
        providerId: providerProfile.id,
    })
}
module.exports = Mongoose.model("users", UserSchema)