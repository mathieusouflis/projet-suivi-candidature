import mongoose from 'mongoose';

const connectDB = async ()=> {
    try{
        await mongoose.connect('mongodb://localhost:27017/my_project_db', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
  });
  console.log('Mongo DB is connected');
} catch (err) {
     console.err('connection failed!',err);

  }
};

export default connectDB;
