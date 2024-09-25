import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userSurname: {
        type: String,
        required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);



const User = models.User || model('User', UserSchema);

export default User;
