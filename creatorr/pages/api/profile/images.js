import { connectToDatabase } from "../../../util/mongodb";
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') {
        const session = await getSession({ req })
        if (session) {
            const inserted = await db.collection('userImages').insertMany([{ user: session.id, cid: req.body.cid}]);
            res.status(200).json(inserted)
        } else {
            res.status(401).json('Unauthorized')
        }
    } else if (req.method === 'PATCH') {
        const images = await db
        .collection("userImages")
        .find({ user: req.body.id })
        .toArray();
        res.status(200).json(images)
    } else if (req.method === 'PUT') {
        const session = await getSession({ req })
        if (session) {
            await db.collection('userImages').deleteOne({ user: session.id, cid: req.body.cid });
            res.status(200).json()
        } else {
            res.status(401).json('Unauthorized')
        }
    }
}
