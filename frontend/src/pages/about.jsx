import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import profile01 from './images/profile01.jpg';
import profile02 from './images/profile02.jpg';
import profile03 from './images/profile03.jpg';

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
      ]
    };
  }

  switchImage() {
    if (this.state.currentImage < this.state.images.length - 1) {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    } else {
      this.setState({
        currentImage: 0
      });
    }
    return this.currentImage;
  }

  componentDidMount() {
    setInterval(this.switchImage, 2500);
  }

  render() {
    return (
      <div class="col col1">
        <img
          class="image round fit"
          src={this.state.images[this.state.currentImage]}
          alt=""
        />
      </div>
    );
  }
}
function RenderTable(){
  let context = 
  [
    "國立臺灣大學電機所 R10921A02 鍾麗文",
    "人生目前是爆炸的情況。",
    "以前這邊是放一些表演資訊什麼的，現在就是人生爆炸。",
    "5/13 14可以來台大音樂節看羊駝樂團！",
  ];
  let lists = [];
  for(let i=0;i<context.length;i++){
    lists.push(<p id="word_hover" key={context[i]}>．{context[i]}</p>)
  }
  return lists  
};

function About() {
  return (
    <div class="inner">
        <div class ="flex flex-2">
          <ChangeImg />
          <div class="col col2">
            <h3>About Me</h3>
            <RenderTable />
          </div>
        </div>
    </div>
  );
 
}


export default About
