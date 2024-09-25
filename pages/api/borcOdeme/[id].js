// pages/api/borc_odeme/[id].js
import dbConnect from '../../../util/dbConnect';
import BorcOdeme from '../../../models/BorcOdeme';

export default async function handler(req, res) {
  const { id } = req.query;
  
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const odeme = await BorcOdeme.findById(id).populate('userId borcId');
      if (!odeme) {
        return res.status(404).json({ message: 'Ödeme kaydı bulunamadı' });
      }
      res.status(200).json(odeme);
    } catch (error) {
      console.error('Error fetching payment record:', error);
      res.status(500).json({ message: 'Ödeme kaydını alırken bir hata oluştu' });
    }
  } else if (req.method === 'PUT') {
    const { userId, borcId, odenmeMiktari } = req.body;

    try {
      const odeme = await BorcOdeme.findById(id);
      if (!odeme) {
        return res.status(404).json({ message: 'Ödeme kaydı bulunamadı' });
      }

      if (userId) odeme.userId = userId;
      if (borcId) odeme.borcId = borcId;
      if (odenmeMiktari) odeme.odenmeMiktari = odenmeMiktari;

      await odeme.save();
      res.status(200).json(odeme);
    } catch (error) {
      console.error('Error updating payment record:', error);
      res.status(500).json({ message: 'Ödeme kaydını güncellerken bir hata oluştu' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const odeme = await BorcOdeme.findById(id);
      if (!odeme) {
        return res.status(404).json({ message: 'Ödeme kaydı bulunamadı' });
      }

      await odeme.remove();
      res.status(200).json({ message: 'Ödeme kaydı başarıyla silindi' });
    } catch (error) {
      console.error('Error deleting payment record:', error);
      res.status(500).json({ message: 'Ödeme kaydını silerken bir hata oluştu' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
