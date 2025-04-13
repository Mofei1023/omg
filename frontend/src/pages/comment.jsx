// frontend/src/pages/Comment.jsx
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import services from "../services";

function Comment() {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const callid = localStorage.getItem("callid");
    if (callid) setUserId(parseInt(callid));
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await services.comment.getAll();
    setAllComments(data);
  };

  const handleTextInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const res = await services.comment.create({
      content: comment,
      userId: userId, // 一定要一起送
    });
    if (res?.id) {
      setComment("");
      fetchComments();
    }
  };
  

  const handleDelete = async (id) => {
    await services.comment.remove(id);
    fetchComments();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <input
          name="comment"
          type="text"
          value={comment}
          onChange={handleTextInputChange}
          placeholder="Please leave a comment"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
        >
          <LockClosedIcon className="w-5 h-5 mr-2" /> Submit
        </button>
      </form>

      <div className="space-y-4">
        {allComments.map((c) => (
          <div
            key={c.id}
            className="flex items-start space-x-3 border-b pb-3 border-gray-200"
          >
            <img
              src={JSON.parse(c.user.img || '""') || "https://via.placeholder.com/50"}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-bold">{c.user.name}</div>
              <div>{c.content}</div>
              <div className="text-sm text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
            {userId === c.userId && (
              <button
                className="text-red-500 text-sm ml-2"
                onClick={() => handleDelete(c.id)}
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
