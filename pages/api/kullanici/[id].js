import dbConnect from '../../../util/dbConnect';
import AidatBilgi from '../../../models/AidatBilgi';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (!id) {
          return res.status(400).json({ message: 'userId query parametresi gereklidir' });
        }

        const aidatBilgileri = await AidatBilgi.find({ userId: id });
        res.status(200).json(aidatBilgileri);
      } catch (error) {
        res.status(400).json({ message: 'Aidat bilgileri alınamadı', error });
      }
      break;
    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ message: 'id query parametresi gereklidir' });
        }

        const deletedAidat = await AidatBilgi.findByIdAndDelete(id);
        if (!deletedAidat) {
          return res.status(404).json({ message: 'Aidat bilgisi bulunamadı' });
        }

        res.status(200).json({ message: 'Aidat bilgisi başarıyla silindi', deletedAidat });
      } catch (error) {
        res.status(400).json({ message: 'Aidat bilgisi silinemedi', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
