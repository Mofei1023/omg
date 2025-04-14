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
    console.log("REQ BODY:", req.body); // ← debug 看傳進來什麼
    const { content, userId } = req.body;
  
    if (!content || !userId) return res.status(400).json({ error: "Missing fields" });
  
    const newComment = await prisma.comment.create({
      data: { content, userId },
    });
  
    console.log("✅ 成功建立留言:", newComment);
    res.status(201).json(newComment);
  }
  

// DELETE 刪除留言
export async function deleteComment(req, res) {
  const commentId = parseInt(req.params.id);
  const currentUserId = req.session.userId; // ✅ 這一步：從 session 拿登入者的 id

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) return res.status(404).json({ error: "Comment not found" });

  // ✅ 這一步：只有留言的作者才能刪除
  if (comment.userId !== currentUserId) {
    return res.status(403).json({ error: "You cannot delete this comment" });
  }

  await prisma.comment.delete({ where: { id: commentId } });
  res.json({ message: "Deleted" });
}

