import React from 'react';
import profile01 from './images/profile01.jpg';
import profile02 from './images/profile02.jpg';
import profile03 from './images/profile03.jpg';
import profile04 from './images/profile04.jpg';
import ethan from './images/ethan.jpg';
import '../index.css';

class ChangeImg extends React.Component {
  constructor(props) {
    super(props);
    this.switchImage = this.switchImage.bind(this);
    this.state = {
      currentImage: 0,
      images: [profile01, profile02, profile03, profile04]
    };
  }

  switchImage() {
    this.setState((prevState) => ({
      currentImage:
        prevState.currentImage < this.state.images.length - 1
          ? prevState.currentImage + 1
          : 0,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(this.switchImage, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="w-full max-w-xs mx-auto">
        <img
          className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-lg"
          src={this.state.images[this.state.currentImage]}
          alt="Profile"
        />
      </div>
    );
  }
}

function RenderTable() {
  const context = [
    "國立臺灣大學電機所 R10921A02 鍾麗文",
    "碩士會拖這麼久其實是因為我都在搞音樂。",
    "我前陣子發布的歌feat Leo王 在右側可以點來看！",
    "5/9要發新歌，接著要發專輯啦！",
  ];

  return (
    <div className="text-white space-y-2">
      {context.map((text) => (
        <p className="hover:underline" key={text}>．{text}</p>
      ))}
    </div>
  );
}

function About() {
  return (
    <div
      className="min-h-screen px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ethan})` }}
    >
      <div className="row">
        <div className="col-12 col-md-4 d-flex align-items-stretch">
          <div className="card bg-black bg-opacity-60 text-white p-4 w-100">
            <div className="pic text-center mb-4">
              <img
                src={profile01}
                alt="Profile"
                className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-lg mx-auto"
              />
            </div>
            <div className="card-header text-xl font-bold">About Me</div>
            <div className="card-body">
              <RenderTable />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 d-flex align-items-stretch justify-content-center mt-4 mt-md-0">
          <div className="card bg-black bg-opacity-60 p-4 w-100">
            <div className="card-body">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/FDgJ3vjfgwg"
                  title="羊駝小姐 feat. Leo王"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 d-flex align-items-stretch justify-content-center mt-4 mt-md-0">
          <div className="card bg-black bg-opacity-60 text-white p-4 w-100">
            <div className="card-header text-xl font-bold">More</div>
            <div className="card-body">
              <p>這裡之後可以放 merch 或最新演出資訊～</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;