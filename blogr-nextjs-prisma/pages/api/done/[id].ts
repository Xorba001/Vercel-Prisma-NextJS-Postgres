import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req, res) {
    const postId = req.query.id;
    const post = await prisma.todoItem.update({
        where: { id: postId },
        data: { isDone: true },
    });
    res.json(post);
}