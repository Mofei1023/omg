import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import profile01 from './images/profile01.jpg';
import profile02 from './images/profile02.jpg';
import profile03 from './images/profile03.jpg';
import profile04 from './images/profile04.jpg';

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

//Banner
function banner(){
  const banner=
  ( <section id="banner">
    <div class="inner">
      <header>
        <h1>Melissa Chung</h1>
        <p>An alpaca a day, keeps the doctor away. </p>
        <p class="clock">{new Date().toLocaleDateString()}  {new Date().toLocaleTimeString()}</p>
      </header>
    </div>
    </section>
  )
  ReactDOM.render(banner,document.getElementById('root'));
}
banner();
setInterval(banner,1000);

//Section_1

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

//Change Img
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

function Col2(){
  return(
    <div class="col col2">
      <h3>About Me</h3>
      <RenderTable />
    </div>
  )
}
function Section_1() {
  return (
    <section class="wrapper style1">
      <div class="inner">
        <div class ="flex flex-2">
          <ChangeImg />
          <Col2 />
        </div>
      </div>
    </section>
  );
}
//section_1
ReactDOM.render(
  <Section_1 />,
  document.getElementById('main')
);

//footer
ReactDOM.render(
        <div class="copyright">
					<ul class="icons">
						<li><a href="https://www.facebook.com/melissa.t.clark.50/" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
						<li><a href="https://www.instagram.com/melissa_mofei/" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
					</ul>
					<div>Cellphone: 0917801088 </div>
					<div>Email: hypermofei0801@gmail.com</div>
        </div>,
  document.getElementById('footer')
);

/*var PicSrc=document.getElementById("mypic");
console.log("hello");
console.log(PicSrc);
PicSrc.addEventListener('mouseout',
function(){
  PicSrc.src=require('./images/Melissa.jpg');
}
)
PicSrc.addEventListener('mouseover',
function(){
  PicSrc.src=require('./images/alpaca_pic.jpg');
}
)*/




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
