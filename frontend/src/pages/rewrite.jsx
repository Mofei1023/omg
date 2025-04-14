// Rewrite.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Rewrite() {
  const [inputText, setInputText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/rewrite', { text: inputText });
      setRewrittenText(res.data.rewritten);
    } catch (err) {
      setError('⚠️ 發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold mb-4">AI 改寫文字</h2>
      <textarea
        rows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="請輸入你想要改寫的內容"
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        disabled={loading}
      >
        {loading ? '生成中...' : '送出改寫'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {rewrittenText && (
        <div className="mt-6 bg-white p-4 border rounded shadow">
          <h3 className="font-semibold mb-2">AI 改寫結果：</h3>
          <p>{rewrittenText}</p>
        </div>
      )}
    </div>
  );
}

export default Rewrite;
