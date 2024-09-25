// pages/api/borc_odeme.js
import dbConnect from '../../../util/dbConnect';
import BorcOdeme from '../../../models/BorcOdeme';
import Borc from '../../../models/Borc';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { userId, borcId, odenmeMiktari } = req.body;

    try {
      // Find the current debt for the user
      const borc = await Borc.findById(borcId);

      if (!borc) {
        return res.status(404).json({ message: 'Borç bulunamadı' });
      }

      // Calculate the total paid amount
      const totalPaid = await BorcOdeme.aggregate([
        { $match: { borcId: borc._id } },
        { $group: { _id: null, total: { $sum: '$odenmeMiktari' } } }
      ]);

      const toplamOdenen = totalPaid.length > 0 ? totalPaid[0].total : 0;
      const kalanBorc = borc.debtAmount - toplamOdenen - odenmeMiktari;

      // Update the debt status if fully paid
      if (kalanBorc <= 0) {
        borc.borcDurumu = true;
        await borc.save();
      }

      // Create the new payment record
      const yeniOdeme = new BorcOdeme({
        userId,
        borcId,
        kalan: kalanBorc,
        odenmeMiktari,
        odendigiTarih: new Date()
      });
      await yeniOdeme.save();

      res.status(201).json(yeniOdeme);
    } catch (error) {
      console.error('Error creating payment record:', error);
      res.status(500).json({ message: 'Borç ödeme sırasında bir hata oluştu' });
    }
  } else if (req.method === 'GET') {
    try {
      const odemeler = await BorcOdeme.find().populate('userId borcId');
      res.status(200).json(odemeler);
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ message: 'Ödemeleri alırken bir hata oluştu' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
