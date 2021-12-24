// Trecho JS do código

function dimensionamento() {
  reset(); //Reseta os gráficos caso não seja a primeira vez que o usuário aperta no calcular

  if (typeof dominio !== "undefined") {
    //Essa variável só é definida no final do processo, de modo que haverá o reset quando o operador apertar o calcular da segunda vez em diante
    desenhoinicial();
  }

  // Entrada de dados
  var fck = document.getElementById("fck");
  var fyk = document.getElementById("fyk");
  var es = document.getElementById("es");
  var gamac = document.getElementById("gamac");
  var gamas = document.getElementById("gamas");
  var gamaf = document.getElementById("gamaf");
  var bduct = document.getElementById("bduct");
  var b = document.getElementById("b");
  var h = document.getElementById("h");
  var d = document.getElementById("d");
  var dl = document.getElementById("dl");
  var amk = document.getElementById("amk");
  var fck1 = Number(fck.value);
  var fyk1 = Number(fyk.value);
  var es1 = Number(es.value);
  var gamac1 = Number(gamac.value);
  var gamas1 = Number(gamas.value);
  var gamaf1 = Number(gamaf.value);
  var bduct1 = Number(bduct.value);
  b1 = Number(b.value);
  h1 = Number(h.value);
  var d1 = Number(d.value);
  var dl1 = Number(dl.value);
  var amk1 = Number(amk.value);
  // Parâmetros do diagrama retangular
  if (fck1 <= 50) {
    alamb = 0.8;
    alfac = 0.85;
    eu = 3.5;
    qlim = 0.8 * bduct1 - 0.35;
  } else {
    alamb = 0.8 - (fck1 - 50) / 400;

    alfac = 0.85 * (1 - (fck1 - 50) / 200);
    eu = 2.6 + 35 * ((90 - fck1) / 100) ** 4;
    qlim = 0.8 * bduct1 - 0.45;
  }
  // Conversão de unidades: transformando para kN e cm
  amk = 100 * amk1;
  fck = fck1 / 10;
  fyk = fyk1 / 10;
  es = 100 * es1;
  // Resistências de cálculo
  fcd = fck / gamac1;
  tcd = alfac * fcd;
  
  fyd = fyk / gamas1;
  amd = gamaf1 * amk;
  
  // Parâmetro geométrico
  delta = dl1 / d1;
  // Momento limite
  amilim = alamb * qlim * (1 - 0.5 * alamb * qlim);
  // Momento reduzido solicitante
  ami = amd / (b1 * d1 * d1 * tcd);
  if (ami <= amilim) {
    // Armadura simples
    var qsi = (1 - Math.sqrt(1 - 2 * ami)) / alamb;
    aas = (alamb * qsi * b1 * d1 * tcd) / fyd;
    asl = 0;
  } else {
    // Armadura dupla
    qsia = eu / (eu + 10);
    if (qlim < qsia) {
      // Evitando armadura dupla no domínio 2
      var test = 1;
      var aviso = "Aumentar a seção transversal!";
    }
    if (qlim <= delta) {
      // Evitando armadura comprimida sob tração
      var test = 1;
      var aviso = "Aumentar a seção transversal!";
    }
    // Deformação da armadura de compressão
    esl = (eu * (qlim - delta)) / qlim;
    esl = esl / 1000;
    ess = Math.abs(esl);
    eyd = fyd / es;
    // Cálculo da tensão no aço
    if (ess < eyd) {
      tsl = es * ess;
    } else {
      tsl = fyd;
    }
    if (esl < 0) {
      tsl = -tsl;
    }

    // Cálculo das áreas de aço quando armadura dupla
    asl = ((ami - amilim) * b1 * d1 * tcd) / ((1 - delta) * tsl);
    aas = ((alamb * qlim + (ami - amilim) / (1 - delta)) * b1 * d1 * tcd) / fyd;
  }
  // Armadura mínima
  a = 2 / 3;
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
  asmin = romin * b1 * h1;
  if (aas < asmin) {
    aas = asmin;
  }
  // Verificação de erros e saída de resultados
  while (
    fck == 0 ||
    fyk == 0 ||
    es == 0 ||
    gamac == 0 ||
    gamas == 0 ||
    gamaf == 0 ||
    bduct == 0 ||
    b == 0 ||
    h == 0 ||
    d == 0 ||
    dl == 0 ||
    amk == 0
  ) {
    test = 2;
    window.alert("[ERRO] Problema na inserção dos dados de entrada!");
    break;
  }
  if (test == 1) {
    resAco.innerHTML = `<strong>${aviso}</strong>`;
  } else if (test == 2) {
    resAco.innerHTML = `<strong>Entre com os dados corretamente!</strong>`;
  } else {
    resAco.innerHTML = `<strong>A área de aço tracionada é ${aas.toFixed(
      2
    )} cm².</strong>`;
    res1.innerHTML = `<strong>A área de aço comprimida é ${asl.toFixed(
      2
    )} cm².</strong>`;
  }


  segundodesenho();
}
