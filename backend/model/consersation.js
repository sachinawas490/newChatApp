import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participant: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, {
    timestamps: true
});

export const Conversation = mongoose.model('Conversation', conversationSchema);