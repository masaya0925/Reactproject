import mongoose from "mongoose";
import { ReturnedObject } from "../utils/types";

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ] 
});

userSchema.set('toJSON', {
    transform: (_document: unknown, returnedObject: ReturnedObject) => {
        if (returnedObject._id !== undefined) {
          returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});


 export const User = mongoose.model('User', userSchema);

