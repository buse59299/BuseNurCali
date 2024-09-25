import User from '../../../models/Giris';
import dbConnect from '../../../util/dbConnect';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {

    await dbConnect();

    const { email, password } = req.body;
    try {
        // Kullanıcıyı veritabanında bul
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email ' });
        }

        // Giriş başarılı
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error',
            status: 500,
        });
    }
};

export default handler;
