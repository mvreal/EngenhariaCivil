// Trecho JS do código

function calcular() {
  // Entrada de dados

dados = document.querySelectorAll(".numero");
dadosNum = [];
dados.forEach((valores) => {
    dadosNum.push(Number(valores.value));
  });
    //Declarando as variáveis
    var {0:fck,1:fyk,2:es,3:gamac,4:gamas,5:gamaf,6:bduct,7:bf,8:hf,9:b,10:h,11:d,12:dl,13:amk} = dadosNum;

 

  if (fck <= 50){
    alamb = 0.8
    alfac = 0.85
    eu = 3.5
    qlim = 0.8 * bduct - 0.35
    qsilim = 0.45
  } else {
    alamb = 0.8 - (fck - 50) / 400;
    alfac = 0.85 * (1 - (fck - 50) / 200)
    eu = 2.6 + 35 * ((90 - fck) / 100) ** 4
    qlim = 0.8 * bduct - 0.45
    qsilim = 0.35
  }

  //Conversão de unidades para KN e cm
    amk = 100 * amk;
    fck = fck / 10;
    fyk = fyk / 10;
    es = 100 * es;

    // Resistências de cálculo
    fcd = fck / gamac;
    tcd = alfac * fcd;
    fyd = fyk / gamas;
    amd = gamaf * amk;

    // Parâmetro geométrico
    delta = dl / d;

    // Parâmetros da seção T
    betaf = hf / d;
    betaw = b / bf;

    if (alamb * qlim <= betaf) {
        console.log("A mesa é muito espessa. A seção funciona como seção retangular de largura bf e altura h.");
    };

    // Momento reduzido solicitante
    ami = amd / (bf * d * d * tcd)

    // Momento limite
    rcclim = betaf + betaw * (alamb * qlim - betaf);
    amilim = (betaf * (1 - 0.5 * betaf)) + (betaw * (alamb * qlim - betaf)) * (1 - 0.5 * (alamb * qlim + betaf));
    var omega1 = 0;



    // Momento resistido pela mesa
    amif = betaf * (1 - 0.5 * betaf)



    if (ami <= amilim) {
        // Armadura simples
        // Momento resistido pela mesa
         amif = betaf * (1 - 0.5 * betaf)
        if (ami <= amif) {
            omega = 1 - Math.sqrt(1 - 2 * ami)
            qsi = (1 - Math.sqrt(1 - 2 * ami)) / alamb;
            x = Math.min(qsi*d,qsilim*d)
        } else {
            ami0 = amif + (ami - amif) / betaw
            omega = betaf * (1 - betaw) + betaw * (1 - Math.sqrt(1 - 2 * ami0))
            qsi = (1 - Math.sqrt(1 - 2 * ami0)) / alamb
            x = Math.min(qsi*d,qsilim*d)
        }
        omega1 = 0
    } else {
        // Armadura dupla
        x = qsilim*d
        qsia = eu / (eu + 10)
        if (qlim < qsia) {
             // Evitando armadura dupla no domínio 2
            var test = 1
            var aviso = "Aumentar a seção transversal!"
        }
        if (qlim <= delta) {
            // Evitando armadura comprimida sob tração
            var test = 1
            var aviso = "Aumentar a seção transversal!"
        }
        // Deformação da armadura de compressão
        esl = eu * (qlim - delta) / qlim
        esl = esl / 1000
        // Trabalhando com deformação positiva
        ess = Math.abs(esl)
        eyd = fyd / es
        // Cálculo da tensão no aço
        if (ess < eyd) {
            tsl = es * ess
        } else {
            tsl = fyd
        }
        if (esl < 0) {
            tsl = -tsl
        }
        // Cálculo das taxas mecânicas de armadura
        omega1 = (ami - amilim) * fyd / ((1 - delta) * tsl)
        omega = rcclim + (ami - amilim) / (1 - delta)
    }
    // Cálculo das áreas de aço
    asl = omega1 * bf * d * tcd / fyd
    aas = omega * bf * d * tcd / fyd
    // Armadura mínima    
    a = 2 / 3
    fck = 10 * fck
    fyd = 10 * fyd
    if (fck <= 50) {
        romin = 0.078 * (fck ** a) / fyd
    } else {
        romin = 0.5512 * Math.log10(1 + 0.11 * fck) / fyd
    }
    if (romin < 0.0015) {
        romin = 0.0015
    }
    // Área da seção de concreto
    ac = bf * hf + b * (h - hf)
    asmin = romin * ac
    if (aas < asmin) {
        aas = asmin
    }
    // Verificação de erros e saída de resultados

    while (fck == 0 || 2*dl>=b || 2*dl >=bf || fyk == 0 || es == 0 || gamac == 0 || gamas == 0 || gamaf == 0 || bduct == 0 || b == 0 || bf == 0 || hf == 0 || h == 0 || d == 0 || dl == 0 || amk == 0) {
        test = 2
        window.alert('[ERRO] Problema na inserção dos dados de entrada!')
        return
    }    
    if (test == 1) {
        res.innerHTML = `<strong>${aviso}</strong>`
    } else if (test == 2) {
        res.innerHTML = `<strong>Entre com os dados corretamente!</strong>`
    } else {
        res.innerHTML = `<strong>A área de aço tracionada é ${aas.toFixed(2)} cm².</strong>`
        res1.innerHTML = `<strong>A área de aço comprimida é ${asl.toFixed(2)} cm².</strong>`
    }

 //Resetando o desenho
 reset();
}


