import dbConnect from '../../../util/dbConnect';
import Borc from '../../../models/Borc';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { userId, debtAmount } = req.body;

    try {
      const newBorc = new Borc({ 
        userId, 
        debtAmount, 
        borcDurumu: false 
      });
      await newBorc.save();
      res.status(201).json(newBorc);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    try {
      const borclar = await Borc.find().populate('userId');
      res.status(200).json(borclar);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
