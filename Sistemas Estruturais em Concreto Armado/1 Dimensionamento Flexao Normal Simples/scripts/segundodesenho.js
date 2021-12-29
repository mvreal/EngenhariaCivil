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
      eo = 0.002;
    } else {
      eu = (2.6 + 35 * ((90 - fck) / 100) ** 4)/1000;
      eo = (2 + 0.0085 * ((fck1 - 50)**0.53))/1000;
    }
  
    //Verificar se a posição da linha neutra está acima do limite permitido pela NBR
    if (fck <= 50) {
      xlim = 0.45 * d;
    } else {
      xlim = 0.35 * d;
    }
  
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
      if(epc>eu){
        dominio = "3";
        epc = eu; 
        ruptura = " A ruptura acontece no concreto";
        eps = (eu * ((d-xa)/xa));
      }
          

    }

    if(fyk1==500){
      eoaco = 2.07/1000;
    }else if(fyk1==600){
      eoaco = 2.48/1000;
    }else{
      console.log("Não foi utilizado aço CA-50 nem CA-60")
    }

    //Colocando os textos de deformação do aço e do concreto
    criardiv2.innerText = (epc*1000).toFixed(3);
    criardiv5.innerText = (eps*1000).toFixed(3);

    //refazendo o segundo desenho com as deformações ultimas e de escoamento do aço e do concreto
    ctx2.clearRect(-300, -300, 600, 600);

   //Fazendo o desenho 2 novamente apos a inserção de dados 14 pixels para cada 1/1000
    ctx2.beginPath();
    ctx2.setLineDash([]);
    ctx2.strokeStyle = 'black'
    ctx2.lineWidth="2";
    ctx2.moveTo(-eu*14000,80);
    ctx2.lineTo(0,80);
    ctx2.lineTo(0,287);
    ctx2.lineTo(140,287);

    //deformações ultimas
    ctx2.moveTo(-eu*14000,80);
    ctx2.lineTo(-eu*14000,88);
    ctx2.moveTo(140,287);
    ctx2.lineTo(140,279);

    //deformações para inicio do patamar de escoamento
    ctx2.moveTo(-eo*14000,80);
    ctx2.lineTo(-eo*14000,88);

    if(fyk1 ==500 || fyk1 ==600){
    ctx2.moveTo(eoaco*14000,287);
    ctx2.lineTo(eoaco*14000,279);
  }

    ctx2.stroke()

    ctx2.font="bold 12px Montserrat";
    ctx2.fillText((eu*1000).toFixed(2),-60,70);
    ctx2.fillText((eo*1000).toFixed(2),-25,70);

    if(fyk1 ==500 || fyk1 ==600){
    ctx2.fillText((eoaco*1000).toFixed(2),20,270);
    }

    ctx2.fillText(10,130,270);



    //Linha neutra
    ctx1.beginPath();
    ctx1.strokeStyle = '#808080'
    ctx1.setLineDash([5, 5]);
    ctx1.lineWidth = "2";
    ctx1.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx1.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx1.stroke();
  
    ctx2.beginPath();
    ctx2.strokeStyle = '#808080'
    ctx2.setLineDash([5, 5]);
    ctx2.lineWidth = "2";
    ctx2.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx2.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx2.stroke();
  
    ctx3.beginPath();
    ctx3.strokeStyle = '#808080'
    ctx3.setLineDash([5, 5]);
    ctx3.lineWidth = "2";
    ctx3.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx3.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h1));
    ctx3.stroke();
  
    //Alamb
    ctx1.beginPath();
    ctx1.setLineDash([5, 3]);
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
    ctx1.fillRect(-20,287,40,5);
  
    ctx1.font="bold 12px Montserrat";
    ctx1.fillText(aas.toFixed(2) + ' cm²',-26,282);

    //Escrevendo a área de aço comprimida na figura 1, desenha apenas se estiver com armadura dupla

    if(asl>0){
    ctx1.beginPath();
    ctx1.fillStyle = "#000080";
    ctx1.fillRect(-20,103,40,5);

    ctx1.font="bold 12px Montserrat";
    ctx1.fillText(asl.toFixed(2) + ' cm²',-26,98);
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
    ctx3.strokeStyle = '#ffa500';
    ctx3.lineWidth = "2";
    ctx3.setLineDash([]);

    //Criando a seta de cima - Desenho 3
    ctx3.moveTo(40,80 + alamb*(230 * Math.min(xa, xlim)) / (2*h1))
    ctx3.lineTo(-20,80 + alamb*(230 * Math.min(xa, xlim)) / (2*h1));
    ctx3.lineTo(-15,85 + alamb*(230 * Math.min(xa, xlim)) / (2*h1))
    ctx3.moveTo(-20,80 + alamb*(230 * Math.min(xa, xlim)) / (2*h1));
    ctx3.lineTo(-15,75 + alamb*(230 * Math.min(xa, xlim)) / (2*h1))
    ctx3.stroke();

    //Resultante de tração
    resTracao = aas * fyd / 10; //Divide por 10 para deixar em kN
    console.log(resTracao);

    //Fazendo a representação da armadura no desenho 3 e colocando a resultante
    ctx3.beginPath();
    ctx3.lineWidth = "2";
    ctx3.strokeStyle = '#7F0000';
    ctx3.fillStyle = '#7F0000';
    ctx3.fillRect(-20,287,-40, 5);
    ctx3.moveTo(-20,289);
    ctx3.lineTo(40,289);
    ctx3.lineTo(35,284);
    ctx3.moveTo(40,289);
    ctx3.lineTo(35,293);
    ctx3.font="bold 12px Arial";
    ctx3.fillText(resTracao.toFixed(2) + " kN",45,294);
    ctx3.stroke();
    
    //Escrevendo a resultante de compressão
    
    if(asl==0){
      resCompressao = resTracao;
    }
    else{
      resCompressaoAco = asl * fyd / 10; //Divide por 10 para transformar em kN
      resCompressao = resTracao - resCompressaoAco
      ctx3.beginPath();
      ctx3.fillStyle = '#000080';
      ctx3.strokeStyle = '#000080';
      ctx3.fillRect(-20,103,-40, 5);
      ctx3.moveTo(40,105);
      ctx3.lineTo(-20,105);
      ctx3.lineTo(-15,110);
      ctx3.moveTo(-20,105);
      ctx3.lineTo(-15,100);
      //Escrevendo texto da força do aço na seção comprimida
      ctx3.font="bold 12px Arial";
      ctx3.fillText(resCompressaoAco.toFixed(2) + " kN",45,100);
      ctx3.stroke();

    }
    ctx3.beginPath();
    ctx3.fillStyle = '#ffa500';
    ctx3.fillText(resCompressao.toFixed(2) + " kN",45,95 + alamb*(230 * Math.min(xa, xlim)) / (2*h1));
    ctx3.stroke();

    //Desenhando o valor do momento resultante na figura 3
    ctx3.beginPath();
    ctx3.fillStyle="black";
    ctx3.font="bold 14px Arial"
    ctx3.fillText("M",50,200);
    ctx3.font="bold 12px Arial";
    ctx3.fillText("Rd",63,205);
    ctx3.fillText((amd/100)+"kN.m",88,200);
    ctx3.stroke();

    //Fazendo as cotas do desenho 1 e colocando os textos
    ctx1.beginPath();
    ctx1.setLineDash([]);

      //Criando a cota da linah neutra 
      ctx1.strokeStyle = 'black';
      ctx1.moveTo(70,80);
      ctx1.lineTo(70,80 + ((230 * Math.min(xa, xlim)) / h1));
      ctx1.moveTo(65,80);
      ctx1.lineTo(75,80);
      ctx1.moveTo(65,80 + ((230 * Math.min(xa, xlim)) / h1));
      ctx1.lineTo(75,80 + ((230 * Math.min(xa, xlim)) / h1));
      ctx1.fillText(xa.toFixed(2) + ' cm',75,85 + ((230 * Math.min(xa, xlim)) / (2*h1)))

      //Criando a cota da seção comprimida lambida * x
      ctx1.moveTo(-80,80);
      ctx1.lineTo(-70,80);
      ctx1.moveTo(-75,80);
      ctx1.lineTo(-75,80 + alamb*(230*xa) / h1);
      ctx1.moveTo(-70,80 + alamb*(230*xa) / h1);
      ctx1.lineTo(-80,80 + alamb*(230*xa) / h1);

      //Criando o texto do lambida multiplicado por X
      ctx1.fillText(alamb.toFixed(2)+' x',-113,85 + alamb*(230*xa) / (2*h1))

      

      ctx1.stroke();

  }

