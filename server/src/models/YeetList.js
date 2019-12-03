import Mongoose, { Schema } from 'mongoose'
const YeetListSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'userProfiles',
        required: true
    },
    yeeted: [{
        type: Schema.Types.ObjectId,
        ref: 'userProfiles'
    }]
})

module.exports = Mongoose.model("yeetLists", YeetListSchema)
