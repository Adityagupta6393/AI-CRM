import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },

    content : {
        type : String,
        required : [true, "content is required"],
    },

    lead : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Lead',
        default : null
    },

    contact : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Contact',
        default : null
    },

    pinned : {
        type : Boolean,
        default : false,
    }

}, {
    timestamps : true
})

export const Note = mongoose.model('Note', noteSchema);