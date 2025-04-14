import React, { useState } from "react";
import ethan from "./images/ethan.jpg";
import "../index.css";

const emotions = ["happy", "sad", "angry", "loving"];
const characters = ["cat", "robot", "pirate", "grandma"];

function AIRewrite() {
  const [prompt, setPrompt] = useState("");
  const [emotion, setEmotion] = useState("happy");
  const [character, setCharacter] = useState("cat");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suspiciousPattern = /<[^>]*script|onerror\s*=|<img|<iframe|<svg|<object/i;

  const handleSubmit = async () => {
    if (suspiciousPattern.test(prompt)) {
      setError("⚠️ 請勿輸入可疑的 HTML 或 JavaScript 內容。系統已紀錄。");
      console.warn("🚨 XSS attempt detected:", prompt);
      return;
    }
    //console.log("🔵 Triggered handleSubmit", { prompt, emotion, character }); // 加這行！
    setLoading(true);
    setResult("");
    setError("");
    try {
      const res = await fetch("https://omg-9scg.onrender.com/api/v1/ai/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ prompt, emotion, character }),
      });      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ethan})` }}
    >
      <div className="container mx-auto">
        <div className="row px-4 pt-4">
          {/* Emotion card */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="card-header">Emotion</div>
              <div className="card-body">
                {emotions.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmotion(e)}
                    className={`btn btn-sm m-1 ${e === emotion ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <div className="card-footer">
                <p className="text">Current: {emotion}</p>
              </div>
            </div>
          </div>

          {/* Character card */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="card-header">Character</div>
              <div className="card-body">
                {characters.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCharacter(c)}
                    className={`btn btn-sm m-1 ${c === character ? "btn-success" : "btn-outline-success"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="card-footer">
                <p className="text">Current: {character}</p>
              </div>
            </div>
          </div>

          {/* Prompt and Result card */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="card-header">AI Rewrite</div>
              <div className="card-body">
                <textarea
                  className="form-control mb-2"
                  placeholder="Enter your prompt..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading || !prompt}
                  className="btn btn-warning w-100"
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
              <div className="card-footer">
                <strong>Result:</strong>
                <p className="text mt-2">{result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIRewrite;
