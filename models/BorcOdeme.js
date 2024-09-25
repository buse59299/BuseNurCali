// models/BorcOdeme.js
import mongoose from 'mongoose';

const BorcOdemeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borcId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borc', required: true },
  kalan: { type: Number, required: true },
  odenmeMiktari: { type: Number, required: true },
  odendigiTarih: { type: Date, default: Date.now, required: true }
});

export default mongoose.models.BorcOdeme || mongoose.model('BorcOdeme', BorcOdemeSchema);
