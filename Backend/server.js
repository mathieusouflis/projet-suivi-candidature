import express from 'express';
import connectDB from './database/Mongo.database.js';
import router from './routes.js';

const app = express();

app.use(express.json());

app.use('./api', router);


connectDB();

const port = process.env.PORT || 3000; 

app.listen(port, ()=> {
     console.log('Server is working, the  server is running on http://localhost:${port}');
});
