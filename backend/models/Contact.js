import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },

    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true
    },

    email : {
        type : String,
        trim : true,
        lowercase : true,
        default : ""
    },

    phone : {
        type : String,
        trim : true,
        default : ""
    },

    company : {
        type : String,
        trim : true,
        default : ""
    },

    title : {
        type : String,
        trim : true,
        default : ""
    },

    tags : [{type : String, trim : true}],

    notes : {
        type : String,
        default : ""
    },

    favorite : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true
});

contactSchema.index({name : "text", email : "text", company : "text"});

export const Contact = mongoose.model('Contact', contactSchema);