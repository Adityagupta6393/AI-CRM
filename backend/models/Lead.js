import mongoose from 'mongoose';

export const LEAD_STATUSES = ["New", "Qualified", "Proposal", "Won", "Lost"];
export const LEAD_PRIORITIES = ["Low", "Medium", "High"];

const leadSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    name : {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    email : {
        type: String,
        trim: true,
        lowercase: true,
        default : ""
    },

    phone : {
        type : String,
        trim : true,
        default : ""
    },

    company : {
        type: String,
        trim : true,
        default : ""
    },

    status : {
        type : String,
        enum : LEAD_STATUSES,
        default : "New",
        index : true
    },

    priority : {
        type : String,
        enum : LEAD_PRIORITIES,
        default : "Medium"
    },

    source : {
        type : String,
        enum : [ "Website", "Referral", "Cold Outreach", "Social", "Event", "Other"],
        default : "Other"
    },

    value : {
        type : Number,
        default : 0,
        min : 0
    },

    notes : {
        type : String,
        default : ""
    },

    tags : [{type : String, trim : true}],

    aiSummary : {
        type : String,
        default : ""
    },

    aiRiskScore : {
        type : Number,
        default : null
    },

    order : {
        type : Number,
        default : 0
    }

}, 
{ timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);