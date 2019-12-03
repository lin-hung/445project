const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
// const MessagesSchema = new Schema({
//     text: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     poster: {
//         type: Schema.Types.ObjectId,
//         ref: 'userProfiles',
//         required: true
//     }
// });
// export const Messages = mongoose.model("messages", MessagesSchema)

const MessageRoomSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'userProfiles',
        required: true
    }],
    messages: [{
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        poster: {
            type: Schema.Types.ObjectId,
            ref: 'userProfiles',
            required: true
        }
    }]
})
export const MessageRooms = mongoose.model('messageRooms', MessageRoomSchema)

