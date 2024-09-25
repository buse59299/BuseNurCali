import mongoose from 'mongoose';
import User from '../../../models/User';
import dbConnect from '../../../util/dbConnect';

const handler = async (req, res) => {
  await dbConnect();
  const { userId } = req.query;

  // Ensure userId is a valid ObjectId string
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (req.method === 'GET') {
    try {
      // Find the user by their ObjectId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      // Update the user with the provided data
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Ensure the update complies with the schema
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
