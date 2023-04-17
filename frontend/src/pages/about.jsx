import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

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
          <Col2 />
        </div>
      </div>
    </section>
  );
}
ReactDOM.render(
  <Section_1 />,
  document.getElementById('main')
);
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

serviceWorker.unregister();

export default function About() {
  return <h1>R10921A02 鍾麗文 </h1>;
}
