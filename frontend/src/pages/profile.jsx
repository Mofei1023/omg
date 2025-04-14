import React, { useEffect, useState } from 'react';
import '../index.css';
import bg from './images/ethan.jpg';
import defaultAvatar from './images/profile01.jpg';

function Profile() {
  const [user, setUser] = useState({ name: '', img: '' });

  useEffect(() => {
    const name = localStorage.getItem('callname') || '';
    let img = '';
    try {
      img = JSON.parse(localStorage.getItem('callimg')) || '';
    } catch {
      img = '';
    }
    setUser({ name, img });
  }, []);

  return (
    <div
      className="min-h-screen px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container mx-auto">
        <div className="row px-4 pt-4">
          {/* 左邊卡片：個人資訊 */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="pic">
                <img
                  src={user.img || defaultAvatar}
                  alt="profile"
                  className="rounded-full"
                />
              </div>
              <div className="card-header">My Profile</div>
              <div className="card-body">
                <h3 className="title">Username: {user.name}</h3>
              </div>
              <div className="card-footer">
                <p className="text">
                  歡迎來到個人頁面！在這裡你可以查看你的帳戶資料。
                </p>
              </div>
            </div>
          </div>

          {/* 中間卡片：MV嵌入（與關聯內容） */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="pic">
                <iframe
                  width="100%"
                  height="200"
                  src="https://youtu.be/ZHgyQGoeaB0?si=iX6R0gbEN70oSSLe"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-header">OIIAIOOIIIAI</div>
              <div className="card-body">
                <h3 className="title"></h3>
              </div>
              <div className="card-footer">
                <p className="text">511215511121</p>
              </div>
            </div>
          </div>

          {/* 右邊卡片：敬請期待 */}
          <div className="col-4 d-flex align-items-stretch">
            <div className="card">
              <div className="pic">
                <img src={defaultAvatar} alt="default" />
              </div>
              <div className="card-header">Coming Soon</div>
              <div className="card-body">
                <h3 className="title">更多內容開發中！</h3>
              </div>
              <div className="card-footer">
                <p className="text">敬請期待新功能與個人化設定 🔧</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;