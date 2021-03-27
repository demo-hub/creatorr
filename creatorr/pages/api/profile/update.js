import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    console.log(req.body);
    const { db } = await connectToDatabase();
    res.status(200).json({name: 'ok'})
}