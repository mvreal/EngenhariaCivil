

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
ctx1.moveTo(-95,60);
ctx1.lineTo(145,60);
ctx1.lineTo(145,96);
ctx1.lineTo(49,96);
ctx1.lineTo(49,220);
ctx1.lineTo(-1,220);
ctx1.lineTo(-1,96);
ctx1.lineTo(-95,96);
ctx1.lineTo(-95,60);
ctx1.stroke();

ctx2.beginPath();
ctx2.strokeStyle = 'black'
ctx2.lineWidth="2";
ctx2.moveTo(-49,60);
ctx2.lineTo(0,60);
ctx2.lineTo(0,204);
ctx2.lineTo(140,204);
ctx2.moveTo(-49,60);
ctx2.lineTo(-49,68);
ctx2.moveTo(-28,60);
ctx2.lineTo(-28,68);
ctx2.moveTo(140,204);
ctx2.lineTo(140,196);
ctx2.moveTo(29,204);
ctx2.lineTo(29,196);
ctx2.stroke()


