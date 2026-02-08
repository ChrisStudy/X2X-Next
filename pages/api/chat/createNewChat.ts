//pages/api/chat/createNewChat.ts
// import { getSession } from '@auth0/nextjs-auth0';
import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await auth0.getSession(req);

        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { user } = session;
        const { message } = req.body;

        const newUserMessage = {
            role: "user",
            content: message,
        };

        const client = await clientPromise;
        const db = client.db("X2XCreativeChat");
        const chat = await db.collection("chats").insertOne({
            userId: user.sub,
            messages: [newUserMessage],
            title: message,
            createdAt: new Date(),
        });

        res.status(200).json({
            _id: chat.insertedId.toString(),
            messages: [newUserMessage],
            title: message,
        });
    } catch(e) {
        console.log("ERROR OCCURRED IN CREATE NEW CHAT:", e);
        res.status(500).json({ message: "An error occurred when creating a new chat" });
    }
}