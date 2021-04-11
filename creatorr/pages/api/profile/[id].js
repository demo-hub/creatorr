import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const user = await db.collection("userUsers").find({ _id: new ObjectId(req.query.id) }).toArray();


    if (!user[0]) {
        res.status(500).json("User does not exist")
        return
    }

    const images = await db
        .collection("userImages")
        .find({ user: user[0].email })
        .toArray();

    res.status(200).json({ profile: user[0], images: images});
}