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
escalax = 230/bf
escalay = 230/h

escalaadotada = Math.min(escalax,escalay);
ea = escalaadotada

bf = bf*ea
hf = hf*ea
b = b*ea
h = h*ea
d=d*ea
x = x*ea
dl = dl*ea

criardiv2.innerText = (epc).toFixed(3);
criardiv5.innerText = (eps).toFixed(3);


ctx1.clearRect(-300, -300, 600, 600);
ctx2.clearRect(-300, -300, 600, 600);
ctx3.clearRect(-300, -300, 600, 600);

//Valor inicial em y no desenho
var inicialy = 60 
var inicialx = 25;

//Desenho da seção no desenho 1
ctx1.beginPath()
ctx1.strokeStyle = 'black'
ctx1.lineWidth="2"
ctx1.setLineDash([0, 0])
ctx1.moveTo(0+inicialx,inicialy)
ctx1.lineTo(bf/2+inicialx,inicialy)
ctx1.lineTo(bf/2+inicialx,inicialy+hf)
ctx1.lineTo(b/2+inicialx,inicialy+hf)
ctx1.lineTo(b/2+inicialx,inicialy+h)
ctx1.lineTo(-b/2+inicialx,inicialy+h)
ctx1.lineTo(-b/2+inicialx,inicialy+hf)
ctx1.lineTo(-bf/2+inicialx,inicialy+hf)
ctx1.lineTo(-bf/2+inicialx,inicialy)
ctx1.lineTo(0+inicialx,inicialy)
ctx1.stroke()

//linha neutra no desenho 1
ctx1.beginPath()
ctx1.strokeStyle = '#808080'
ctx1.setLineDash([5, 5])
ctx1.moveTo(-175,inicialy+x)
ctx1.lineTo(175,inicialy+x)
ctx1.font="bold 12px Arial"
ctx1.fillStyle = '#808080'
ctx1.fillText(`L.N.`,-145,inicialy+x+12);
ctx1.stroke()

//Cota da linha neutra no desenho 1
ctx1.beginPath()
ctx1.strokeStyle = 'black'
ctx1.setLineDash([0, 0])
ctx1.moveTo((bf/2)+10+inicialx,inicialy)
ctx1.lineTo((bf/2)+10+inicialx,inicialy+x)
ctx1.moveTo((bf/2)+5+inicialx,inicialy)
ctx1.lineTo((bf/2)+15+inicialx,inicialy)
ctx1.moveTo((bf/2)+5+inicialx,inicialy+x)
ctx1.lineTo((bf/2)+15+inicialx,inicialy+x)
ctx1.stroke()

//Valor númerico da cota da linha neutra do desenho 1 
ctx1.strokeStyle = '#808080'
ctx1.font="bold 10px Montserrat";
ctx1.fillText((x/ea).toFixed(2) + ' cm',(bf/2)+15+inicialx,(inicialy+x/2)+3);

//Linha para cota da relação alamb.'x'
ctx1.beginPath()
ctx1.strokeStyle = 'black'
ctx1.setLineDash([0, 0])
ctx1.moveTo((-bf/2)-10+inicialx,inicialy)
ctx1.lineTo((-bf/2)-10+inicialx,inicialy+x*alamb)
ctx1.moveTo((-bf/2)-15+inicialx,inicialy)
ctx1.lineTo((-bf/2)-5+inicialx,inicialy)
ctx1.moveTo((-bf/2)-5+inicialx,inicialy+x*alamb)
ctx1.lineTo((-bf/2)-15+inicialx,inicialy+x*alamb)
ctx1.stroke()

// Escrevendo o texto alamb.'x' para o desenho 1 
ctx1.strokeStyle = '#808080'
ctx1.font="bold 10px Montserrat";
ctx1.fillText((alamb).toFixed(2)+'.x',(-bf/2)+inicialx-45,(inicialy+x*alamb/2)+3);

//Escrevendo area de aço tracionada no desenho 1
ctx1.beginPath();
ctx1.fillStyle = "#7F0000";
ctx1.fillRect((-b/2)+dl+inicialx,inicialy+h-dl-5,(b)-2*dl,5);  ///////VEEEEEEEEEEEEEEEEEEEEEEEEEERRRRR
  
ctx1.font="bold 10px Montserrat";
ctx1.fillText(aas.toFixed(2) + ' cm²',-24+inicialx,inicialy+h-dl-7);

//Escrevendo area de aço comprimida no desenho 1
if(asl>0){
  ctx1.beginPath();
  ctx1.fillStyle = "#000080";
  ctx1.fillRect(-(bf)/2+dl+inicialx,inicialy+dl,(bf-2*dl),5);

  ctx1.font="bold 10px Montserrat";
  ctx1.fillText(asl.toFixed(2) + ' cm²',-24+inicialx,inicialy+dl+15);
  }

//Refazer o desenho 2
ctx2.beginPath()
ctx2.strokeStyle = 'black'
ctx2.setLineDash([0, 0])
ctx2.moveTo(-eu*14,inicialy);
ctx2.lineTo(0,inicialy);
ctx2.lineTo(0,inicialy+h-dl);
ctx2.lineTo(140,inicialy+h-dl);
ctx2.moveTo(-eu*14,inicialy);
ctx2.lineTo(-eu*14,inicialy+8);
ctx2.moveTo(-eo*14,inicialy);
ctx2.lineTo(-eo*14,inicialy+8);
ctx2.moveTo(140,inicialy+h-dl);
ctx2.lineTo(140,inicialy+h-dl-8);
ctx2.moveTo(29,inicialy+h-dl);
ctx2.lineTo(29,inicialy+h-dl-8);
ctx2.stroke()

//Linha da deformação do concreto e do aço para o desenho 2 
ctx2.beginPath()
ctx2.strokeStyle = 'blue'
ctx2.setLineDash([5, 5])
ctx2.moveTo(-epc*14,inicialy);
ctx2.lineTo(eps*14,inicialy+h-dl);
ctx2.stroke()

//linha neutra no desenho 2
ctx2.beginPath()
ctx2.strokeStyle = '#808080'
ctx2.setLineDash([5, 5])
ctx2.moveTo(-175,inicialy+x)
ctx2.lineTo(175,inicialy+x)
ctx2.font="bold 12px Arial"
ctx2.fillStyle = '#808080'
ctx2.stroke()

//Desenhando o valor do momento resultante na figura 3
ctx3.beginPath();
ctx3.fillStyle="black";
ctx3.font="bold 14px Arial"
ctx3.fillText("M",50,inicialy+h/2);
ctx3.font="bold 12px Arial";
ctx3.fillText("Rd",61,inicialy+5+h/2);
ctx3.fillText((amd/100)+"kN.m",85,inicialy+3+h/2);
ctx3.stroke();

//Seção do desenho 3

ctx3.beginPath()
ctx3.strokeStyle = 'black'
ctx3.lineWidth="2"
ctx3.setLineDash([0, 0])
ctx3.moveTo(-20,inicialy)
ctx3.lineTo(-20,inicialy+hf)
ctx3.lineTo(-80,inicialy+hf)
ctx3.lineTo(-80,inicialy)
ctx3.lineTo(-20,inicialy)
ctx3.moveTo(-20,inicialy+hf)
ctx3.lineTo(-20,inicialy+h)
ctx3.lineTo(-80,inicialy+h)
ctx3.lineTo(-80,inicialy+hf)
ctx3.stroke()

//forças de tração e compressão da armadura
//Divide por 10 para transformar em kN
resTracao = aas * fyd / 10
resCompressaoAco = asl * fyd / 10 
ctx3.fillStyle = '#000080'
ctx3.strokeStyle = '#000080'
if(asl>0){
ctx3.beginPath()
ctx3.fillRect(-20,inicialy+dl,-40, 5)
ctx3.moveTo(40,inicialy+dl+2.5);
ctx3.lineTo(-20,inicialy+dl+2.5);
ctx3.lineTo(-15,inicialy+dl+7.5);
ctx3.moveTo(-20,inicialy+dl+2.5);
ctx3.lineTo(-15,inicialy+dl-2.5);
ctx3.font="bold 12px Arial";

ctx3.fillText(resCompressaoAco.toFixed(2) + " kN",45,inicialy+dl+1.5*ea);
}
ctx3.stroke()

ctx3.beginPath()
ctx3.lineWidth = "2";
ctx3.strokeStyle = '#7F0000';
ctx3.fillStyle = '#7F0000';
ctx3.fillRect(-20,inicialy+h-dl,-40, 5);
ctx3.moveTo(-20,inicialy+h-dl+2.5);
ctx3.lineTo(40,inicialy+h-dl+2.5);
ctx3.lineTo(35,inicialy+h-dl-2.5);
ctx3.moveTo(40,inicialy+h-dl+2.5);
ctx3.lineTo(35,inicialy+h-dl+7.5);
ctx3.font="bold 12px Arial";
ctx3.fillText(resTracao.toFixed(2) + " kN",45,inicialy+h-dl+1.5*ea);
ctx3.stroke();

console.log(h/ea)

}

