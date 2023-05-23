// pages/api/post/index.ts
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { text } = req.body;

    const result = await prisma.todoItem.create({
        data: {
            text: text,
        },
    });
    res.json(result);
}