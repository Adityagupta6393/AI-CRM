import mongoose from "mongoose";

const TASK_STATUSES = ["Pending", "In Progress", "Completed"];
const TASK_PRIORITIES = ["Low", "Medium", "High"];
const taskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    dueDate: { 
        type: Date, 
        default: null 
    },

    status: { 
        type: String, 
        enum: TASK_STATUSES, 
        default: "Pending", 
        index: true 
    },

    priority: { 
        type: String, 
        enum: TASK_PRIORITIES, 
        default: "Medium" 
    },

    relatedLead: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Lead", 
        default: null 
    },

    relatedContact: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Contact", 
        default: null 
    },
    
    completedAt: { 
        type: Date, 
        default: null 
    },
},

    { timestaps: true }
);

export const Task = mongoose.model('Task', taskSchema);