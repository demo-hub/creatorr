import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const updated = await db.collection('users').updateOne({ email: req.body.email }, { $set: req.body })
    res.status(200).json(updated)
}