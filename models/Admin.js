import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  AdminName: {
    type: String,
    required: true,
  },
  AdminSurname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
