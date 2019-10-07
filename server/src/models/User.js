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
    googleID: {
        type: String,
        required: false
    },
    linkedinID: {
        type: String,
        required: false
    }
})
UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})
UserSchema.methods.getUserProfile = function (cb) {
    return UserProfile.findOne({ user: this._id }).exec(cb)
}
module.exports = Mongoose.model("users", UserSchema)