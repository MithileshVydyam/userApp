import mongoose from "mongoose";


export const userAppSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  active: Boolean,
  createdDate: { type: Date, default: Date.now }
});

export const userAppModel = mongoose.model('user', userAppSchema);//collection name and schema of collection
