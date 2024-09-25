import User from '../../../models/User';
import dbConnect from '../../../util/dbConnect';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // Connect to the database
  await dbConnect();

  const { userName, userSurname, phoneNumber, email, password, confirmPassword } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({
      message: 'User with this email already exists',
      status: 400,
    });
    return;
  }

  // Check if userName already exists
  const existingUserName = await User.findOne({ userName });
  if (existingUserName) {
    res.status(400).json({
      message: 'User with this username already exists',
      status: 400,
    });
    return;
  }

  // Validate that passwords match
  if (password !== confirmPassword) {
    res.status(400).json({
      message: 'Passwords do not match',
      status: 400,
    });
    return;
  }

  // Hash the password and create a new user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      userSurname,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      status: 201,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
};

export default handler;
