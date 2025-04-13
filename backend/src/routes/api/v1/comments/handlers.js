// src/routes/api/v1/comments/handlers.js
import { prisma } from "../../../../adapters.js";

// GET 所有留言
export async function getAllComments(req, res) {
  const comments = await prisma.comment.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(comments);
}

// POST 新增留言
export async function createComment(req, res) {
  const { text, authorId } = req.body;
  if (!text || !authorId) return res.status(400).json({ error: "Missing fields" });

  const newComment = await prisma.comment.create({
    data: { text, authorId },
  });
  res.status(201).json(newComment);
}

// DELETE 刪除留言
export async function deleteComment(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  await prisma.comment.delete({ where: { id } });
  res.json({ message: "Deleted" });
}
