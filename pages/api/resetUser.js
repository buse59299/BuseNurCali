import dbConnect from '@/util/dbConnect';
import AidatBilgi from '@/models/AidatBilgi';
import Borc from '@/models/Borc'; // Eğer Borc modeliniz varsa bunu da ekleyin
import BorcOdeme from '@/models/BorcOdeme';
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const { userId } = req.body;
        if (!userId) {
          return res.status(400).json({ message: 'userId parametresi gereklidir' });
        }

        // Kullanıcının AidatBilgi ve Borc bilgilerini sil
        const deletedAidatBilgi = await AidatBilgi.deleteMany({ userId });
        const deletedBorc = await Borc.deleteMany({ userId });
        const deletedBorcOdeme = await BorcOdeme.deleteMany({ userId });
        res.status(200).json({
          message: 'Kullanıcının bilgileri başarıyla silindi',
          deletedAidatBilgi,
          deletedBorc,
          deletedBorcOdeme,
        });
      } catch (error) {
        res.status(400).json({ message: 'Kullanıcının bilgileri silinemedi', error });
      }
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
