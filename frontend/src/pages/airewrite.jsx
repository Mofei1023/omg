import React, { useState } from "react";
import ethan from "./images/ethan.jpg";
import "../index.css";
import services from "../services"; // 確保最上面有引入
import alpaca from "./images/alpaca.jpg";
import alpacapic from "./images/alpaca_pic.jpg";
// Emotion 對應圖片
import happyImg from "./images/emotion_happy.png";
import sadImg from "./images/emotion_sad.jpeg";
import angryImg from "./images/emotion_angry.jpg";
import lovingImg from "./images/emotion_loving.jpeg";

// Character 對應圖片
import catImg from "./images/cat.jpeg";
import robotImg from "./images/robot.jpg";
import pirateImg from "./images/pirate.jpg";
import grandmaImg from "./images/grandma.png";

// Emotion + Character 對照表
const emotionImages = {
  happy: happyImg,
  sad: sadImg,
  angry: angryImg,
  loving: lovingImg,
};

const characterImages = {
  cat: catImg,
  robot: robotImg,
  pirate: pirateImg,
  grandma: grandmaImg,
};


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
      console.warn("🚨 XSS attempt detected in prompt:", prompt);
      return;
    }
  
    setLoading(true);
    setResult("");
    setError("");
  
    try {
      const data = await services.ai.rewrite({ prompt, emotion, character });
      setResult(data.result);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Unknown error");
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
        <div className="col-4 d-flex align-items-stretch">
  <div className="card">
    <div className="pic">
      <img src={emotionImages[emotion]} alt={emotion} />
    </div>
    <div className="card-header">Select an emotion</div>
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


          <div className="col-4 d-flex align-items-stretch">
  <div className="card">
    <div className="pic">
      <img src={characterImages[character]} alt={character} />
    </div>
    <div className="card-header">Select a Character</div>
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
              <div className="card-header">AI CHAT</div>
              <div className="card-body">
                <textarea
                  className="form-control mb-2"
                  placeholder="Chat with the customized AI (in English)："
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
