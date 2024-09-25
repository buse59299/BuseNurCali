import dbConnect from '../../../util/dbConnect';
import Borc from '../../../models/Borc';

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const borc = await Borc.findById(id).populate('_id');

        if (!borc) {
          return res.status(404).json({ success: false, message: 'Borç bulunamadı' });
        }

        res.status(200).json({ success: true, data: borc });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Geçersiz istek' });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
