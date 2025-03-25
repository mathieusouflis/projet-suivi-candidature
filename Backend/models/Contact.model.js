import mongoose from 'mongoose';

// define Contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],  // regular expression!
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'responded', 'closed'],  // possible statuses
    default: 'new',
  },
});

//create a contact model

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;