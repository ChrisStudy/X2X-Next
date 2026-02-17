import {NextApiRequest, NextApiResponse} from "next";
import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { user } = session;
    const client = await clientPromise;
    const db = client.db("X2XCreativeChat");
    const chats = await db.collection("chats").find({
         userId: user.sub
    }, {
        projection: {
            userId: 0,
            message: 0
        }
    }).sort({
        _id:-1
    }).toArray();
    res.status(200).json({chats})
    try {

    }catch(e){
        res.status(500).json({ message: "An error occurred when getting the chat list" });
    }
}