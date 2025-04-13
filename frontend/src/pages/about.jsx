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
      images: [
        profile01,
        profile02,
        profile03,
        profile04
      ]
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${ethan})` }}
    >
      <div className="bg-black bg-opacity-60 rounded-xl p-6 md:p-12 flex flex-col md:flex-row items-center md:items-start md:space-x-10 max-w-6xl w-full">
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <ChangeImg />
          <h3 className="text-white text-3xl font-bold mb-4 mt-6 md:mt-8">About Me</h3>
          <RenderTable />
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/FDgJ3vjfgwg"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default About;
