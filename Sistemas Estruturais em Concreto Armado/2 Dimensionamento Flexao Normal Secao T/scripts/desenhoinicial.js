

let desenhos = document.getElementsByTagName('canvas');
ctx1 = desenhos[0].getContext("2d");
ctx2 = desenhos[1].getContext("2d");
ctx3 = desenhos[2].getContext("2d");

ctx1.translate(150,0);
ctx2.translate(150,0);
ctx3.translate(150,0);

ctx1.beginPath();
ctx1.strokeStyle = 'black'
ctx1.lineWidth="2";
ctx1.moveTo(-120,60);
ctx1.lineTo(120,60);
ctx1.lineTo(120,96);
ctx1.lineTo(24,96);
ctx1.lineTo(24,220);
ctx1.lineTo(-24,220);
ctx1.lineTo(-24,96);
ctx1.lineTo(-120,96);
ctx1.lineTo(-120,60);
ctx1.stroke();

ctx2.beginPath();
ctx2.strokeStyle = 'black'
ctx2.lineWidth="2";
ctx2.moveTo(-49,80);
ctx2.lineTo(0,80);
ctx2.lineTo(0,224);
ctx2.lineTo(140,224);
ctx2.moveTo(-49,80);
ctx2.lineTo(-49,88);
ctx2.moveTo(-28,80);
ctx2.lineTo(-28,88);
ctx2.moveTo(140,224);
ctx2.lineTo(140,216);
ctx2.moveTo(29,224);
ctx2.lineTo(29,216);
ctx2.stroke()


