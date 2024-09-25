import bcrypt from 'bcryptjs';
import dbConnect from '../../../util/dbConnect';
import Admin from '../../../models/Admin';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { AdminName, AdminSurname, phoneNumber, email, password } = req.body;

    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Bu bilgilere sahip yönetici bulunmaktadır.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        AdminName,
        AdminSurname,
        phoneNumber,
        email,
        password: hashedPassword,
      });

      await newAdmin.save();

      return res.status(201).json({ message: 'Yönetici başarıyla kaydedildi.' });
    } catch (err) {
      return res.status(500).json({ message: `Bir hata oluştu: ${err.message}` });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
