import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "@/lib/mongodb";
import {auth0} from "@/lib/auth0";
import {ObjectId} from "mongodb";
interface ChatMessage {
    role: string;
    content: string;
}

interface Chat {
    _id: ObjectId;
    userId: string;
    messages: ChatMessage[];
    title: string;
    createdAt: Date;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await auth0.getSession(req);
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = session;
        const client = await clientPromise;
        const db = client.db("X2XCreativeChat");
        const {chatId, role, content } = req.body;
        const chat = await db.collection("chats").findOneAndUpdate({
            _id: new ObjectId(chatId),
            userId: user.sub
        },
            {
            $push: {
                messages:{
                    role,
                    content
                }
            }
        } ,
            {
            returnDocument: "after"
        });
        // Check if chat exists
        if (!chat || !chat.value) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.status(200).json({
            chat: {
                ...chat.value,
                _id: chat.value._id.toString(),
            },
        });
    }catch(e){
        res.status(500).json({ message: "An error occurred when adding a message to a chat" });
    }
}