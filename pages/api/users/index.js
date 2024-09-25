import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect();

    const { method } = req;

    if (method === "GET") {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "An error occurred while fetching users." });
        }
    }

    if (method === "POST") {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            console.error("Error creating user:", err);
            if (err.code === 11000) {
                // Duplicate key error
                res.status(400).json({ error: "Email or username already exists." });
            } else {
                res.status(500).json({ error: "An error occurred while creating user." });
            }
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};

export default handler;
