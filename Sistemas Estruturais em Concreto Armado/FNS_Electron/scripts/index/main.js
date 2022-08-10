let infosNumero = []
function dimensionar() {

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
        eyd = fyd / E;
        // Cálculo da tensão no aço
        if (ess < eyd) {
            tsl = E * ess;
        } else {
            tsl = fyd;
        }
        if (esl < 0) {
            tsl = -tsl;
        }

        // Cálculo das áreas de aço quando armadura dupla
        asl = ((ami - amilim) * b * d * tcd) / ((1 - delta) * tsl);
        aas = ((alamb * qlim + (ami - amilim) / (1 - delta)) * b * d * tcd) / fyd;
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
    asmin = romin * b * h;
    if (aas < asmin) {
        aas = asmin;
    }
    //Área de aço tracionada e área de aço comprimida

    let ast = Number(aas.toFixed(2))
    let asc = Number(asl.toFixed(2))

    console.log(ast,asc)
}



















function pegarValue(element) {
    infosNumero.push(Number(element.value))
}
