// models/Borc.js
import mongoose from 'mongoose';

const BorcSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  debtAmount:{ type: Number},
  date: { type: Date, default: Date.now },
  borcDurumu:{ type: Boolean }

});

export default mongoose.models.Borc || mongoose.model('Borc', BorcSchema);
