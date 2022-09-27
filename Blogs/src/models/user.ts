import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { ReturnedObject } from "../utils/types";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      require: true,
      unique: true,
      minlength: 3
      
    },
    name: {
      type: String,
      require: true
    },
    passwordHash: {
      type: String,
      require: true
    },
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

userSchema.plugin(uniqueValidator);

export const User = mongoose.model('User', userSchema);

