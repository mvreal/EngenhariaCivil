

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

//RetÂngulo do desenho 3
ctx3.beginPath();
ctx3.setLineDash([]);
ctx3.strokeStyle = 'black'
ctx3.lineWidth="2";
ctx3.moveTo(-80,60);
ctx3.lineTo(-20,60);
ctx3.lineTo(-20,220);
ctx3.lineTo(-80,220);
ctx3.lineTo(-80,60)
ctx3.moveTo(-20,96);
ctx3.lineTo(-80,96);
ctx3.stroke()

//Cabo do momento do desenho 3
ctx3.beginPath();
ctx3.arc(45,140,40,1.5*Math.PI,2.5*Math.PI);
ctx3.stroke();
    
//Ponta do momento do desenho 3
ctx3.beginPath();
ctx3.setLineDash([]);
ctx3.moveTo(45,88);
ctx3.lineTo(45,110);
ctx3.lineTo(25,99);
ctx3.lineTo(45,88)
ctx3.stroke();
    



