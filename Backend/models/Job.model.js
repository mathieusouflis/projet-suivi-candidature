import mongoose from 'mongoose';

// define Job schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,  // normally we have to use Number as a type but i used String for avoiding managing ranges, we can change it later if we can change it later.
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create a job model: 
const Job = mongoose.model('Job', jobSchema);

export default Job; 