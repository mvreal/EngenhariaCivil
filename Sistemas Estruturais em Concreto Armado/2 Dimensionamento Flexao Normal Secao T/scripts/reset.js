function reset(){

let desenhos = document.getElementsByTagName('canvas');
ctx1 = desenhos[0].getContext("2d");
ctx2 = desenhos[1].getContext("2d");
ctx3 = desenhos[2].getContext("2d");



dados = document.querySelectorAll(".numero");
dadosNum = [];
dados.forEach((valores) => {
    dadosNum.push(Number(valores.value));
  });
    //Declarando as variáveis
    var {0:fck,1:fyk,2:es,3:gamac,4:gamas,5:gamaf,6:bduct,7:bf,8:hf,9:b,10:h,11:d,12:dl,13:amk} = dadosNum;


//Calculando a escala do desenho para ampliar ou reduzir caso necessário
escalax = 240/bf
escalay = 240/h

escalaadotada = Math.min(escalax,escalay);
ea = escalaadotada

bf = bf*ea
hf = hf*ea
b = b*ea
h = h*ea
d=d*ea
x = x*ea



ctx1.clearRect(-300, -300, 600, 600);

//Valor inicial em y no desenho
var y = 60 

//Desenho da seção no desenho1
ctx1.beginPath();
ctx1.strokeStyle = 'black'
ctx1.lineWidth="2";
ctx1.setLineDash([0, 0]);
ctx1.moveTo(0,y);
ctx1.lineTo(bf/2,y);
ctx1.lineTo(bf/2,y+hf);
ctx1.lineTo(b/2,y+hf);
ctx1.lineTo(b/2,y+h);
ctx1.lineTo(-b/2,y+h);
ctx1.lineTo(-b/2,y+hf);
ctx1.lineTo(-bf/2,y+hf);
ctx1.lineTo(-bf/2,y);
ctx1.lineTo(0,y);
ctx1.stroke();

//linha neutra no desenho1
ctx1.beginPath();
ctx1.strokeStyle = '#808080'
ctx1.setLineDash([5, 5]);
ctx1.moveTo(-145,y+x);
ctx1.lineTo(150,y+x);
ctx1.stroke();

ctx1.font="bold 12px Arial";
ctx1.fillStyle = '#808080'
ctx1.fillText(`L.N.`,-145,y-5+x);

}














// if (x <= hf) {
//   ctx1.moveTo(-bf/2,y+x);
//   ctx1.lineTo(bf/2,y+x);
//   }else{
//     ctx1.moveTo(-b/2,y+x);
//     ctx1.lineTo(b/2,y+x);
//   }
//   ctx1.stroke();
  