let infosNumero = []
function dimensionar() {

    reset(); //Reseta os gráficos caso não seja a primeira vez que o usuário aperta no calcular

    if (typeof dominio !== "undefined") {
        //Essa variável só é definida no final do processo, de modo que haverá o reset quando o operador apertar o calcular da segunda vez em diante
        desenhoinicial();
    }

    const infos = document.querySelectorAll('.info')
    infosNumero = []
    infos.forEach(pegarValue)

    let [h, b, d, fck, fyk, E, gamac, gamas, gamaf, amk, beta] = infosNumero

    if (fck <= 50) {
        var alamb = 0.8;
        var alfac = 0.85;
        var eu = 3.5;
        var qlim = 0.8 * beta - 0.35;
    } else {
        var alamb = 0.8 - (fck - 50) / 400;
        var alfac = 0.85 * (1 - (fck - 50) / 200);
        var eu = 2.6 + 35 * ((90 - fck) / 100) ** 4;
        var qlim = 0.8 * beta - 0.45;
    }
    // Conversão de unidades: transformando para kN e cm
    amk = 100 * amk;
    fck = fck / 10;
    fyk = fyk / 10;
    E = 100 * E;
    // Resistências de cálculo
    let fcd = fck / gamac;
    let tcd = alfac * fcd;
    let fyd = fyk / gamas;
    let amd = gamaf * amk;

    // Parâmetro geométrico
    let delta = (h - d) / d;
    // Momento limite
    let amilim = alamb * qlim * (1 - 0.5 * alamb * qlim);
    // Momento reduzido solicitante
    let ami = amd / (b * d * d * tcd);

    if (ami <= amilim) {
        // Armadura simples
        var qsi = (1 - Math.sqrt(1 - 2 * ami)) / alamb;
        var aas = (alamb * qsi * b * d * tcd) / fyd;
        var asl = 0;

    } else {
        // Armadura dupla
        var qsia = eu / (eu + 10);

        // Deformação da armadura de compressão
        var esl = (eu * (qlim - delta)) / qlim;
        esl = esl / 1000;
        var ess = Math.abs(esl);
        var eyd = fyd / E;
        // Cálculo da tensão no aço
        if (ess < eyd) {
            var tsl = E * ess;
        } else {
            var tsl = fyd;
        }
        if (esl < 0) {
            tsl = -tsl;
        }

        // Cálculo das áreas de aço quando armadura dupla
        var asl = ((ami - amilim) * b * d * tcd) / ((1 - delta) * tsl);
        var aas = ((alamb * qlim + (ami - amilim) / (1 - delta)) * b * d * tcd) / fyd;
    }
    // Armadura mínima
    var a = 2 / 3;
    fck = 10 * fck;
    fyd = 10 * fyd;
    if (fck <= 50) {
        romin = (0.078 * fck ** a) / fyd;
    } else {
        romin = (0.5512 * Math.log10(1 + 0.11 * fck)) / fyd;
    }
    if (romin < 0.0015) {
        romin = 0.0015;
    }
    asmin = romin * b * h;
    if (aas < asmin) {
        aas = asmin;
    }
    //Área de aço tracionada e área de aço comprimida

    let ast = Number(aas.toFixed(2))
    let asc = Number(asl.toFixed(2))

    //Textos e respostas

    let textosRespostas = {
        'tracao':[document.getElementById('txtTracionada'),document.getElementById('resAreaTracionada')],
        'compressao':[document.getElementById('txtComprimida'),document.getElementById('resAreaComprimida')]
    }



    textosRespostas['tracao'][0].innerText = 'Tracionada: '
    textosRespostas['compressao'][0].innerText = 'Comprimida: '
    textosRespostas['tracao'][1].innerText = ast + " cm², "
    textosRespostas['compressao'][1].innerText = asc + " cm²"

    //FIM DA PRIMEIRA ETAPA E INÍCIO DA SEGUNDA

    //Cálculo do qsi
    if (ami > amilim) {
        qsi = (1 - Math.sqrt(1 - 2 * amilim)) / alamb;
    } else {
        qsi = (1 - Math.sqrt(1 - 2 * ami)) / alamb;
    }

    //linha neutra
    xa = qsi * d;


    //Concreto do tipo 1
    if (fck <= 50) {
        eu = 3.5 / 1000
        eo = 0.002
    } else {
        eu = (2.6 + 35 * ((90 - fck) / 100) ** 4) / 1000
        eo = ((2 + 0.085 * ((fck - 50) ** 0.53))) / 1000
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
        eps = (eu * ((d - xa) / xa));
        epc = eu;
    }
    else {
        dominio = "2";
        ruptura = "A ruptura acontece no aço";
        eps = 10 / 1000;
        epc = (0.01 * xa) / (d - xa);
        if (epc > eu) {
            dominio = "3";
            epc = eu;
            ruptura = " A ruptura acontece no concreto";
            eps = (eu * ((d - xa) / xa));
        }
    }

    //Apenas convertendo o valor de kN/cm² para MPa
    fyk = 10 * fyk

    if (fyk == 500) {
        eoaco = 2.07 / 1000;
    } else if (fyk == 600) {
        eoaco = 2.48 / 1000;
    } else {

        console.log("Não foi utilizado aço CA-50 nem CA-60, o aço utilizado foi: " + fyk)
    }

    //Colocando os textos de deformação do aço e do concreto
    // criardiv2.innerText = (epc * 1000).toFixed(3);
    // criardiv5.innerText = (eps * 1000).toFixed(3);

    //refazendo o segundo desenho com as deformações ultimas e de escoamento do aço e do concreto
    ctx2.clearRect(-300, -300, 600, 600);

    //Fazendo o desenho 2 novamente apos a inserção de dados 14 pixels para cada 1/1000
    ctx2.beginPath();
    ctx2.setLineDash([]);
    ctx2.strokeStyle = '#d3d3d3'
    ctx2.lineWidth = "2";
    ctx2.moveTo(-eu * 14000, 80);
    ctx2.lineTo(0, 80);
    ctx2.lineTo(0, 287);
    ctx2.lineTo(140, 287);

    //deformações ultimas
    ctx2.moveTo(-eu * 14000, 80);
    ctx2.lineTo(-eu * 14000, 88);
    ctx2.moveTo(140, 287);
    ctx2.lineTo(140, 279);

    //deformações para inicio do patamar de escoamento
    ctx2.moveTo(-eo * 14000, 80);
    ctx2.lineTo(-eo * 14000, 88);

    if (fyk == 500 || fyk == 600) {
        ctx2.moveTo(eoaco * 14000, 287);
        ctx2.lineTo(eoaco * 14000, 279);
    }

    ctx2.stroke()

    ctx2.font = "bold 12px Montserrat";
    ctx2.fillText((eu * 1000).toFixed(2)+'‰', -60, 70);
    ctx2.fillText((eo * 1000).toFixed(2)+'‰', -25, 70);

    if (fyk == 500 || fyk == 600) {
        ctx2.fillText((eoaco * 1000).toFixed(2)+'‰', 20, 270);
    }

    ctx2.fillText(10+'‰', 125, 270);



    //Linha neutra
    ctx1.beginPath();
    ctx1.strokeStyle = 'white'
    ctx1.setLineDash([5, 5]);
    ctx1.lineWidth = "2";
    ctx1.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx1.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx1.stroke();

    ctx2.beginPath();
    ctx2.strokeStyle = 'white'
    ctx2.setLineDash([5, 5]);
    ctx2.lineWidth = "2";
    ctx2.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx2.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx2.stroke();

    ctx3.beginPath();
    ctx3.strokeStyle = 'white'
    ctx3.setLineDash([5, 5]);
    ctx3.lineWidth = "2";
    ctx3.moveTo(150, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx3.lineTo(-150, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx3.stroke();

    //Alamb
    ctx1.beginPath();
    ctx1.setLineDash([5, 3]);
    ctx1.strokeStyle = '#ffa500'
    ctx1.lineWidth = "2";
    ctx1.moveTo(50, 80 + alamb * (230 * Math.min(xa, xlim)) / h);
    ctx1.lineTo(-50, 80 + alamb * (230 * Math.min(xa, xlim)) / h);
    ctx1.stroke();

    //Tensão no concreto - Desenho 3 
    ctx3.beginPath();
    ctx3.strokeStyle = '#ffa500'
    ctx3.lineWidth = "2";
    ctx3.moveTo(-20, 80 + alamb * (230 * Math.min(xa, xlim)) / h);
    ctx3.lineTo(20, 80 + alamb * (230 * Math.min(xa, xlim)) / h);
    ctx3.lineTo(20, 80);
    ctx3.lineTo(-20, 80);
    ctx3.stroke();


    //Escrevendo area de aço tracionada na figura 1

    ctx1.beginPath();
    ctx1.fillStyle = "#7F0000";
    ctx1.fillRect(-20, 287, 40, 5);

    ctx1.font = "bold 12px Montserrat";
    ctx1.fillText(aas.toFixed(2) + ' cm²', -26, 282);

    //Escrevendo a área de aço comprimida na figura 1, desenha apenas se estiver com armadura dupla

    if (asl > 0) {
        ctx1.beginPath();
        ctx1.fillStyle = "#000080";
        ctx1.fillRect(-20, 103, 40, 5);

        ctx1.font = "bold 12px Montserrat";
        ctx1.fillText(asl.toFixed(2) + ' cm²', -26, 98);
    }

    //Linha de deformação - Desenho 2 
    ctx2.beginPath();
    ctx2.strokeStyle = '#0000ff'
    ctx2.lineWidth = "1";
    ctx2.moveTo(-epc * 14000, 80);
    ctx2.lineTo(eps * 14000, 287);
    ctx2.stroke();

    //escrevendo LN
    ctx1.font = "bold 12px Arial";
    ctx1.fillStyle = 'white'
    ctx1.fillText(`L.N.`, -145, 75 + ((230 * Math.min(xa, xlim)) / h));

    //Escrevendo o domínio 
    document.getElementById('resDominio').innerHTML = "Domínio: " + dominio;

    //Fazendo as setas e escrevendo as forças no desenho 3
    ctx3.beginPath();
    ctx3.strokeStyle = '#ffa500';
    ctx3.lineWidth = "2";
    ctx3.setLineDash([]);

    //Criando a seta de cima - Desenho 3
    ctx3.moveTo(40, 80 + alamb * (230 * Math.min(xa, xlim)) / (2 * h))
    ctx3.lineTo(-20, 80 + alamb * (230 * Math.min(xa, xlim)) / (2 * h));
    ctx3.lineTo(-15, 85 + alamb * (230 * Math.min(xa, xlim)) / (2 * h))
    ctx3.moveTo(-20, 80 + alamb * (230 * Math.min(xa, xlim)) / (2 * h));
    ctx3.lineTo(-15, 75 + alamb * (230 * Math.min(xa, xlim)) / (2 * h))
    ctx3.stroke();

    //Resultante de tração
    resTracao = aas * fyd / 10; //Divide por 10 para deixar em kN

    //Fazendo a representação da armadura no desenho 3 e colocando a resultante
    ctx3.beginPath();
    ctx3.lineWidth = "2";
    ctx3.strokeStyle = '#7F0000';
    ctx3.fillStyle = '#7F0000';
    ctx3.fillRect(-20, 287, -40, 5);
    ctx3.moveTo(-20, 289);
    ctx3.lineTo(40, 289);
    ctx3.lineTo(35, 284);
    ctx3.moveTo(40, 289);
    ctx3.lineTo(35, 293);
    ctx3.font = "bold 12px Arial";
    ctx3.fillText(resTracao.toFixed(2) + " kN", 45, 294);
    ctx3.stroke();

    //Escrevendo a resultante de compressão

    if (asl == 0) {
        resCompressao = resTracao;
    }
    else {
        resCompressaoAco = asl * fyd / 10; //Divide por 10 para transformar em kN
        resCompressao = resTracao - resCompressaoAco
        ctx3.beginPath();
        ctx3.fillStyle = '#000080';
        ctx3.strokeStyle = '#000080';
        ctx3.fillRect(-20, 103, -40, 5);
        ctx3.moveTo(40, 105);
        ctx3.lineTo(-20, 105);
        ctx3.lineTo(-15, 110);
        ctx3.moveTo(-20, 105);
        ctx3.lineTo(-15, 100);
        //Escrevendo texto da força do aço na seção comprimida
        ctx3.font = "bold 12px Arial";
        ctx3.fillText(resCompressaoAco.toFixed(2) + " kN", 45, 100);
        ctx3.stroke();

    }
    ctx3.beginPath();
    ctx3.fillStyle = '#ffa500';
    ctx3.fillText(resCompressao.toFixed(2) + " kN", 45, 95 + alamb * (230 * Math.min(xa, xlim)) / (2 * h));
    ctx3.stroke();

    //Desenhando o valor do momento resultante na figura 3
    ctx3.beginPath();
    ctx3.fillStyle = "#d3d3d3";
    ctx3.font = "bold 14px Arial"
    ctx3.fillText("M", 50, 200);
    ctx3.font = "bold 12px Arial";
    ctx3.fillText("Rd", 63, 205);
    ctx3.fillText((amd / 100) + "kN.m", 88, 200);
    ctx3.stroke();

    //Fazendo as cotas do desenho 1 e colocando os textos
    ctx1.beginPath();
    ctx1.setLineDash([]);

    //Criando a cota da linha neutra 
    ctx1.strokeStyle = '#d3d3d3';
    ctx1.moveTo(70, 80);
    ctx1.lineTo(70, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx1.moveTo(65, 80);
    ctx1.lineTo(75, 80);
    ctx1.moveTo(65, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx1.lineTo(75, 80 + ((230 * Math.min(xa, xlim)) / h));
    ctx1.fillText(xa.toFixed(2) + ' cm', 75, 85 + ((230 * Math.min(xa, xlim)) / (2 * h)))

    //Criando a cota da seção comprimida lambida * x
    ctx1.moveTo(-80, 80);
    ctx1.lineTo(-70, 80);
    ctx1.moveTo(-75, 80);
    ctx1.lineTo(-75, 80 + alamb * (230 * xa) / h);
    ctx1.moveTo(-70, 80 + alamb * (230 * xa) / h);
    ctx1.lineTo(-80, 80 + alamb * (230 * xa) / h);

    //Criando o texto do lambida multiplicado por X
    ctx1.fillText(alamb.toFixed(2) + ' x', -113, 85 + alamb * (230 * xa) / (2 * h))
    ctx1.stroke();

    //Fazendo a cota do desenho 3
    ctx3.beginPath();
    ctx3.strokeStyle = 'white';
    ctx3.moveTo(-80, 80 + alamb * (230 * Math.min(xa, xlim)) / (2 * h));
    ctx3.lineTo(-80, 289);
    ctx3.moveTo(-75, 80 + alamb * (230 * Math.min(xa, xlim)) / (2 * h));
    ctx3.lineTo(-85, 80 + alamb * (230 * Math.min(xa, xlim)) / (2 * h));
    ctx3.moveTo(-85, 289);
    ctx3.lineTo(-75, 289);
    ctx3.stroke();
    ctx3.beginPath();
    ctx3.fillStyle = 'white';


    //Escrevendo o texto da cota do desenho 3
    ctx3.fillText((d - (alamb * (xa / 2))).toFixed(2) + " cm", -75, 200)
    ctx3.stroke();












}



















function pegarValue(element) {
    infosNumero.push(Number(element.value))
}
