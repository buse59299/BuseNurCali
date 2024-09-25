import dbConnect from '../../../util/dbConnect';
import AidatBilgi from '../../../models/AidatBilgi';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const aidatBilgi = new AidatBilgi(req.body);
        await aidatBilgi.save();
        res.status(201).json({ message: 'Aidat bilgisi başarıyla kaydedildi', aidatBilgi });
      } catch (error) {
        res.status(400).json({ message: 'Aidat bilgisi kaydedilemedi', error });
      }
      break;
    case 'GET':
      try {
        const aidatBilgileri = await AidatBilgi.find({});
        res.status(200).json(aidatBilgileri);
      } catch (error) {
        res.status(400).json({ message: 'Aidat bilgileri getirilemedi', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
