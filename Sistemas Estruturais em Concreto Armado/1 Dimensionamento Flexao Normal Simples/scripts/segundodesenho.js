function segundodesenho() {

    fck = Number(document.getElementById("fck").value);
    d = Number(document.getElementById("d").value);
  
    //Cálculo do qsi
    qsi = (1 - Math.sqrt(1 - 2 * ami)) / alamb;
  
    //linha neutra
    xa = qsi * d;
  
    //Concreto do tipo 1
    if (fck <= 50) {
      eu = 3.5/1000;
    } else {
      eu = (2.6 + 35 * ((90 - fck) / 100) ** 4)/1000;
    }
  
    //Verificar se a posição da linha neutra está acima do limite permitido pela NBR
    if (fck <= 50) {
      xlim = 0.45 * d;
    } else {
      xlim = 0.35 * d;
    }
  
    //console.log("A posição da linha neutra é de " + xa + " cm");
    //console.log(
    //   "É necessário comparar a linha neutra com o seu valor limite, o valor limite é de:" +
    //     xlim +
    //     " cm, nesse caso a posicao da linha neutra será:" +
    //     Math.min(xa, xlim) +
    //     " cm"
    // );
  
    if (xa > xlim) {
      dominio = "3";
      ruptura = " A ruptura acontece no concreto";
      xa = xlim;
      eps = (eu * ((d-xa)/xa));
      epc = eu;
    }
    else {
      dominio = "2";
      ruptura = "A ruptura acontece no aço";
      eps = 10 / 1000;
      epc = (0.01 * xa) / (d - xa);
      if(epc>=0.0035){
        dominio = "3"; 
        ruptura = " A ruptura acontece no concreto";
        epc = 0.0035;
        eps = (eu * ((d-xa)/xa));
      }
      
      
    }

    
    //console.log("A peça se encontra no " + dominio);
    //console.log("A deformação no concreto é de " + epc);
    //console.log("A deformação no aço é de " + eps);
  
    //Colocando os textos de deformação do aço e do concreto
    criardiv2.innerText = (epc*1000).toFixed(3);
    criardiv5.innerText = (eps*1000).toFixed(3);
  
    //Linha neutra
    ctx1.beginPath();
    ctx1.strokeStyle = '#808080'
    ctx1.setLineDash([5, 3]);
    ctx1.lineWidth = "2";
    ctx1.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx1.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx1.stroke();
  
    ctx2.beginPath();
    ctx2.strokeStyle = '#808080'
    ctx2.setLineDash([5, 3]);
    ctx2.lineWidth = "2";
    ctx2.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx2.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx2.stroke();
  
    ctx3.beginPath();
    ctx3.strokeStyle = '#808080'
    ctx3.setLineDash([5, 3]);
    ctx3.lineWidth = "2";
    ctx3.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx3.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx3.stroke();
  
  
    //Alamb
    ctx1.beginPath();
    ctx1.strokeStyle = '#ffa500'
    ctx1.lineWidth = "2";
    ctx1.moveTo(50, 80 + alamb*(230 * Math.min(xa, xlim)) / h1);
    ctx1.lineTo(-50, 80 + alamb*(230 * Math.min(xa, xlim)) / h1);
    ctx1.stroke();

    //Tensão no concreto - Desenho 3 
    ctx3.beginPath();
    ctx3.strokeStyle = '#ffa500'
    ctx3.lineWidth = "2";
    ctx3.moveTo(-20, 80 + alamb*(230 * Math.min(xa, xlim)) / h1);
    ctx3.lineTo(20, 80 + alamb*(230 * Math.min(xa, xlim)) / h1);
    ctx3.lineTo(20, 80);
    ctx3.lineTo(-20, 80);
    ctx3.stroke();

  
    //Escrevendo area de aço tracionada na figura 1
  
    ctx1.beginPath();
    ctx1.fillStyle = "#7F0000";
    ctx1.fillRect(-20,280,40,10);
  
    ctx1.font="bold 14px Montserrat";
    ctx1.fillText(aas.toFixed(2) + ' cm²',-28,275);

    //Escrevendo a área de aço comprimida na figura 1, desenha apenas se estiver com armadura dupla

    if(asl>0){
    ctx1.beginPath();
    ctx1.fillStyle = "#000080";
    ctx1.fillRect(-20,103,40,10);

    ctx1.font="bold 14px Montserrat";
    ctx1.fillText(asl.toFixed(2) + ' cm²',-28,98);
    }

    //Linha de deformação - Desenho 2 
    ctx2.beginPath();
    ctx2.strokeStyle = '#0000ff'
    ctx2.lineWidth = "1";
    ctx2.moveTo(-epc*14000,80);
    ctx2.lineTo(eps*14000,287);
    ctx2.stroke();
  
    //escrevendo LN
    ctx1.font="bold 12px Arial";
    ctx1.fillStyle = '#808080'
    ctx1.fillText(`L.N.`,-145, 75 + ((230 * Math.min(xa, xlim)) / h1));

    //Escrevendo o domínio 
    document.getElementById('resDominio').innerHTML = "Domínio: " + dominio;
    
    //Fazendo as setas e escrevendo as forças no desenho 3
    ctx3.beginPath();
    ctx3.strokeStyle = '#191970';
    ctx3.lineWidth = "2";
    ctx3.setLineDash([]);

    //Criando a seta de cima - Desenho 3
    ctx3.moveTo(40,80 + alamb*(230 * Math.min(xa, xlim)) / (2*h1))
    ctx3.lineTo(-20,80 + alamb*(230 * Math.min(xa, xlim)) / (2*h1));
    ctx3.lineTo(-15,85 + alamb*(230 * Math.min(xa, xlim)) / (2*h1))
    ctx3.moveTo(-20,80 + alamb*(230 * Math.min(xa, xlim)) / (2*h1));
    ctx3.lineTo(-15,75 + alamb*(230 * Math.min(xa, xlim)) / (2*h1))
    ctx3.stroke();

    //Colocando o valor comprimido no desenho 3
    // ctx3.font="bold 12px Arial";
    // ctx3.fillStyle = '##191970';

    // ctx3.fillText(`L.N.`,-145, 75 + ((230 * Math.min(xa, xlim)) / h1));



    
    
  }

