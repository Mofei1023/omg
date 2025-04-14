import React from 'react';
import profile01 from './images/profile01.jpg';
import ALPACA from './images/ALPACA.jpeg'
import ethan from './images/ethan.jpg';
import TWFest from './images/TWFest.jpeg'
import '../index.css';

function About() {
  return (
    <div
      className="min-h-screen px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ethan})` }}
    >
      <div className="container mx-auto">
        <div className="row px-4 pt-4">
          {/* 左邊卡片：簡介 */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="pic">
                <img src={ALPACA} alt="profile" />
              </div>
              <div className="card-header">
                About Me
              </div>
              <div className="card-body">
                <h3 className="title">
                  你好我是羊駝🦙
                </h3>
              </div>
              <div className="card-footer">
                <p className="text">
                  國立臺灣大學電機所 R10921A02 鍾麗文
                  以羊駝小姐的身份在活動當中
                  5月開始要來發專輯了！
                </p>
              </div>
            </div>
          </div>

          {/* 中間卡片：影片 */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="pic">
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/FDgJ3vjfgwg"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-header">
                Music Video
              </div>
              <div className="card-body">
                <h3 className="title">
                  耳朵糖果 - 羊駝小姐 feat. Leo王
                </h3>
              </div>
              <div className="card-footer">
                <p className="text">
                  歡迎觀看我最近發行的單曲 MV！
                </p>
              </div>
            </div>
          </div>

          {/* 右邊卡片：預留文字區塊 */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="pic">
                <img src={TWFest} alt="default" />
              </div>
              <div className="card-header">
                Coming Soon
              </div>
              <div className="card-body">
                <h3 className="title">
                  敬請期待更多內容！
                </h3>
              </div>
              <div className="card-footer">
                <p className="text">
                  接下來會陸續上架更多音樂企劃與作品介紹。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;