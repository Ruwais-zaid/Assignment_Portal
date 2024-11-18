import mongoose from "mongoose";

const Connection  = () => { mongoose
  .connect('mongodb://localhost:27017/assignmentPortal')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

}
export default Connection;