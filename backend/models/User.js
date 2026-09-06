import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    email : {
        type: String,
        required : [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },

    password : {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },

    role : {
        type: String,
        enum: ['owner', 'member'],
        default: 'owner'
    },

    company : {
        type: String,
        trim: true,
        default: ""
    },

    avatar : {
        type: String,
        default: ""
    },
},{
    timestamps: true
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(entered) {
    return await bcrypt.compare(entered, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;