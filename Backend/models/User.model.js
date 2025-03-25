import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    //user-name:
    name: {
        type: String,
        required: true,
        trim: true,
    },

    //user-mail:
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    //user-password (hashed!!!):
    password: {
        type: String,
        required: true,
    },
    //user-country:
    country: {
        type: String,
        required: true,
    },

    //user-professional-status:
    status_pro: {
        type: String,
        required: true
    },
    //user-creation-date:
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

//create a user model

const User = mongoose.model('User', 'userSchema');

export default User;