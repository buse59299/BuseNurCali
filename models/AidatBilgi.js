import mongoose from 'mongoose';

const AidatBilgiSchema = new mongoose.Schema({
  AidatDonemi: {
    type: String,
    required: true,
  },
  AidatYili: {
    type: Number,
    required: true,
    maxlength: 4,
  },
  AidatMiktari: {
    type: Number,
    required: true,
  },
  OdenmeTarihi: {
    type: Date,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.AidatBilgi || mongoose.model('AidatBilgi', AidatBilgiSchema);
