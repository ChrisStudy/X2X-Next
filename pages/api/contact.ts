// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        // Send email
        await resend.emails.send({
            from: 'Contact Form <x2xcreative@gmail.com>', // Resend's test domain
            to: 'x2xcreative@gmail.com', // Your email
            subject: `New contact from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        // Save to MongoDB (optional)
        const client = await clientPromise;
        const db = client.db("X2XCreativeChat");
        await db.collection("contacts").insertOne({
            name,
            email,
            message,
            createdAt: new Date(),
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
}