
function desenhar(){

desenho1 = document.getElementById("desenho1");
desenho2 = document.getElementById("desenho2");
desenho3 = document.getElementById("desenho3");

ctx1 = desenho1.getContext("2d");
ctx2 = desenho2.getContext("2d");
ctx3 = desenho3.getContext("2d");

ctx1.translate(150,0);
ctx2.translate(150,0);
ctx3.translate(150,0);

ctx1.beginPath();
ctx1.lineWidth="2";
ctx1.moveTo(50,80);
ctx1.lineTo(50,310);
ctx1.lineTo(-50,310);
ctx1.lineTo(-50,80);
ctx1.lineTo(50,80);
ctx1.stroke()

//14 pixels para cada 1/1000
ctx2.beginPath();
ctx2.lineWidth="2";
ctx2.moveTo(-49,80);
ctx2.lineTo(0,80);
ctx2.lineTo(0,287);
ctx2.lineTo(140,287);

ctx2.moveTo(-49,80);
ctx2.lineTo(-49,88);

ctx2.moveTo(-49,80);
ctx2.lineTo(-49,88);

ctx2.moveTo(-28,80);
ctx2.lineTo(-28,88);

ctx2.moveTo(140,287);
ctx2.lineTo(140,279);

ctx2.moveTo(29,287);
ctx2.lineTo(29,279);

ctx2.stroke()

ctx3.beginPath();
ctx3.lineWidth="2";
ctx3.moveTo(-120,80);
ctx3.lineTo(-20,80);
ctx3.lineTo(-20,310);
ctx3.lineTo(-120,310);
ctx3.stroke()



ctx2.font="14px Montserrat";
ctx2.fillText('3,5',-70,70)
ctx2.fillText('2',-35,70)

ctx2.fillText('10',130,270)
ctx2.fillText('2,07',20,270)

ctx3.beginPath();
ctx3.arc(85,200,60,1.5*Math.PI,2.5*Math.PI);
ctx3.stroke();

ctx3.beginPath();
ctx3.moveTo(85,130);
ctx3.lineTo(85,152);
ctx3.lineTo(65,141);
ctx3.lineTo(85,130)
ctx3.stroke();

}

//Criar as divs com a deformação do aço e concreto
var ctncanvas = document.getElementById('ctncanvas');
criardiv = document.createElement('div');
criardiv2 = document.createElement('div');
criardiv3=document.createElement('div');

ctncanvas.classList.add("ctn2");
criardiv.id='divcriada1';
criardiv2.id="divcriada2";
criardiv3.id="divcriada3"

ctncanvas.appendChild(criardiv);
criardiv.appendChild(criardiv2);
criardiv.appendChild(criardiv3);

//

criardiv4 = document.createElement('div');
criardiv5 = document.createElement('div');
criardiv6 = document.createElement('div');

criardiv4.id='divcriada4';
criardiv5.id="divcriada5";
criardiv6.id="divcriada6"

ctncanvas.appendChild(criardiv4);
criardiv4.appendChild(criardiv5);
criardiv4.appendChild(criardiv6);

desenhar();