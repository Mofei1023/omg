// src/pages/AIRewrite.jsx
import React, { useState } from "react";
import "../index.css";

function AIRewrite() {
  const [text, setText] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRewrite = async () => {
    setLoading(true);
    setRewritten("");
    setError("");
    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Rewrite failed");

      const data = await response.json();
      setRewritten(data.rewritten || "（後端尚未提供實際結果）");
    } catch (err) {
      setError("⚠️ 無法取得改寫結果，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">AI Rewrite ✨</h2>

        <textarea
          className="w-full border border-gray-300 rounded-md p-3 h-40 resize-none mb-4"
          placeholder="請輸入你想要改寫的文字..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded"
            onClick={handleRewrite}
            disabled={loading}
          >
            {loading ? "改寫中..." : "改寫"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {rewritten && (
          <div className="mt-6 bg-gray-100 p-4 rounded border border-gray-300">
            <h3 className="font-semibold mb-2">改寫後的結果：</h3>
            <p>{rewritten}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIRewrite;
