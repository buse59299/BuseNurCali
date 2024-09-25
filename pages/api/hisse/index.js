import dbConnect from '@/util/dbConnect';
import Data from '@/models/Data';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const data = await Data.findOne({});
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data from database' });
    }
  } else if (req.method === 'POST') {
    try {
      await Data.deleteMany({});
      const newData = await Data.create(req.body);
      res.status(201).json(newData);
    } catch (err) {
      console.error("Error creating data:", err);
      if (err.code === 11000) {
        // Duplicate key error
        res.status(400).json({ error: "Duplicate data." });
      } else {
        res.status(500).json({ error: "An error occurred while creating data." });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
