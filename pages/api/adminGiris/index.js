import bcrypt from 'bcryptjs';
import dbConnect from '@/util/dbConnect';
import Admin from '@/models/Admin';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
      }

      // Başarılı giriş
      return res.status(200).json({ message: 'Başarılı giriş!', token: 'your_jwt_token_here' });
    } catch (err) {
      return res.status(500).json({ message: `Bir hata oluştu: ${err.message}` });
    }
  } else if (req.method === 'GET') {
    try {
      const admins = await Admin.find({});
      return res.status(200).json(admins);
    } catch (err) {
      return res.status(500).json({ message: `Bir hata oluştu: ${err.message}` });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
