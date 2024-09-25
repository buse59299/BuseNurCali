import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  hisse: { type: Number, required: true },
  hisseKati: { type: Number, required: true },
  tavanBedeli: { type: Number, required: true },
  karPayi: { type: Number, required: true },
  sandiginToplamAltini: { type: Number, required: true },
});

export default mongoose.models.Data || mongoose.model('Data', DataSchema);
