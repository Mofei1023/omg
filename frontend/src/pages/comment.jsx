import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import services from "../services";

function Comment() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState(null);

  // 讀取登入者資訊
  useEffect(() => {
    const uid = localStorage.getItem("callid");
    setUserId(Number(uid));
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await services.comment.getAll();
      setComments(res);
    } catch (err) {
      console.error("Fetch comments failed:", err);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      await services.comment.create({ content: comment });
      setComment("");
      fetchComments(); // 重新載入留言
    } catch (err) {
      console.error("Create comment failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await services.comment.delete(id);
      fetchComments(); // 重新載入
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <input
          name="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Please leave a comment"
          className="block w-full rounded-md border py-2 px-3 text-gray-900 ring-1 ring-gray-300"
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500"
        >
          <LockClosedIcon className="h-5 w-5 mr-2 text-indigo-300" />
          Submit
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex items-start space-x-3 border-b pb-4"
          >
            <img
              src={JSON.parse(c.user.img || '""')}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold">{c.user.name}</div>
              <div className="text-sm text-gray-700">{c.content}</div>
            </div>
            {c.userId === userId && (
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
