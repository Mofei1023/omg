import React from 'react';
import profile01 from './images/profile01.jpg';
import profile02 from './images/profile02.jpg';
import profile03 from './images/profile03.jpg';
import profile04 from './images/profile04.jpg';
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
      <div className="col col1">
        <img
          className="image round fit"
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
    "人生目前是爆炸的情況。",
    "以前這邊是放一些表演資訊什麼的，現在就是人生爆炸。",
    "好希望這門課可以過關",
  ];

  return (
    <div>
      {context.map((text) => (
        <p id="word_hover" key={text}>．{text}</p>
      ))}
    </div>
  );
}

function About() {
  return (
    <div className="inner">
      <div className="flex flex-2">
        <ChangeImg />
        <div className="col col2">
          <h3>About Me</h3>
          <RenderTable />
        </div>
      </div>
    </div>
  );
}

export default About;