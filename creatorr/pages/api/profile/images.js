import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') {
        const inserted = await db.collection('userImages').insertMany([{ user: req.body.email, cid: req.body.cid}]);
        res.status(200).json(inserted)
    } else {
        const images = await db
        .collection("userImages")
        .find({})
        .toArray();
        res.status(200).json(images)
    }
}
