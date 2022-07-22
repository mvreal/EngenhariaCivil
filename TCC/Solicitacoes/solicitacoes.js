var importarDados = [{
    area: 1350,
    dados: {b: 30, h: 45},
    ixg: 227812.5,
    slug: "&#9608",
    tipo: "Retângular"
    },
    {
    area: 5125,
    dados:{
    bf: 100,
    bmis: 5,
    bw: 30,
    h: 100,
    hf: 30,
    hmis: 5
    },
    ixg: 4171152.6084010834,
    slug: "T",
    tipo: "T"
    },
    {
    area: 7250,
    dados:{
    bf: 100,
    bi: 100,
    bmisins: 5,
    bmissup: 5,
    bw: 30,
    h: 100,
    hf: 30,
    hi: 30,
    hmisinf: 5,
    hmissup: 5,
    },
    ixg: 7976875,
    slug: "&#9014",
    tipo: "I"
    }
]

document.addEventListener('DOMContentLoaded',()=>{
    let getSelect = document.getElementById('selectCargas')
    
    importarDados.forEach((element,index)=>{
        let createOption = document.createElement('option')
        createOption.innerText= 'Figura: ' + (index+1) +', Área: ' + element.area +' cm²'
        getSelect.appendChild(createOption)
        createOption.value = index + 1
    })
})

let ctnIconDuvida = document.querySelectorAll('.duvida')
let ctnDuvida = document.querySelector('#textoDuvida')
let ctnMensagemDuvida = document.querySelector('#ctnMensagemDuvida')

ctnIconDuvida.forEach((element,index)=>{
    element.addEventListener('click',(event)=>{
        if(index == 0){ctnDuvida.innerHTML = "O vão compreende a distância entre o centro do apoio esquerdo até o centro do apoio direito"}
        if(index == 1){ctnDuvida.innerHTML = "'g<sub>1</sub>' corresponde ao peso próprio da viga, calculada com base na área definida na Tela: Propriedades Geométricas da Seção, para selecionar um valor é necessário escolher uma das figuras salvas"}
        if(index == 2){ctnDuvida.innerHTML = "'g<sub>2</sub>' corresponde ao somatório dos demais pesos próprios que não sejam da viga"}
        if(index == 3){ctnDuvida.innerHTML = "'q' corresponde a ação variável"}
        if(index == 4){ctnDuvida.innerHTML = "'&#936<sub>1</sub>' é o fator de redução de combinação frequente para ELS, para saber mais verificar a Tabela 11.4 da NBR 6118-2013"}
        if(index == 5){ctnDuvida.innerHTML = "'&#936<sub>2</sub>' é o fator de redução de combinação quase-permanente para ELS, para saber mais verificar a Tabela 11.4 da NBR 6118-2013"}
        if(index == 6){ctnDuvida.innerHTML = "'&#947<sub>g<sub>1</sub></sub>' é o coeficiente de ponderação da ação permanente 1 no estado-limite último, para saber mais verificar a Tabela 11.1 da NBR 6118-2013"}
        if(index == 7){ctnDuvida.innerHTML = "'&#947<sub>g<sub>2</sub></sub>' é o coeficiente de ponderação da ação permanente 2 no estado-limite último, para saber mais verificar a Tabela 11.1 da NBR 6118-2013"}
        if(index == 8){ctnDuvida.innerHTML = "'&#947<sub>q</sub>' é o coeficiente de ponderação da ação variável no estado-limite último, para saber mais verificar a Tabela 11.1 da NBR 6118-2013"}

        ctnMensagemDuvida.style.top = (event.screenY-80) + 'px'
        ctnMensagemDuvida.style.left = (event.screenX-10) + 'px'
        ctnMensagemDuvida.style.border = '1px solid black'
        
        setTimeout(() => {
            ctnDuvida.innerHTML = ""
        ctnMensagemDuvida.style.border = 'none'
        }, 8000);
       
    })
})


getSelect = document.getElementById('selectCargas')
var primeiroCarregamentoCompleto = []
let getInputPrimeiroCarregamento = document.getElementById('inputPrimeiroCarregamento')
getSelect.addEventListener('change',(event)=>{
    let indexSelecionado = Number(event.target.value-1)
    primeiroCarregamentoCompleto = (importarDados[indexSelecionado].area * 25/10000)
    getInputPrimeiroCarregamento.value = primeiroCarregamentoCompleto.toFixed(3)
})

getBtnCalcular = document.getElementById('btnCalcular')
getBtnCalcular.addEventListener('click',()=>{
    if(verificarInputs() === true){
        esconderContainerResultados()
        return
    }
    sucesso()
    mostrarContainerResultados()

    let mostrardepois = document.querySelectorAll(".mostrardepois")
    mostrardepois.forEach((element)=>{element.style.display = 'inline'})
    var getCanvas = document.querySelectorAll('canvas')

    escreverTitulos()
    desenharBasico()
    calcular()
    desenharEsforcoCortante(getCanvas)

})

document.addEventListener('keydown',function (e) {
    if(e.key === '-'){
        e.preventDefault();
    }
})

let ctx = []
function desenharBasico(){

    let canvas= document.querySelectorAll('canvas')

    canvas.forEach((element,index)=>{
        element.width = 400
        element.height = 150
        
        ctx[index] = element.getContext('2d')
        //Apoio esquerdo
        ctx[index].beginPath()
        ctx[index].lineWidth = 1
        ctx[index].beginPath()
        ctx[index].moveTo(35,55)
        ctx[index].lineTo(25,75)
        ctx[index].lineTo(45,75)
        ctx[index].lineTo(35,55)
        ctx[index].moveTo(25,75)
        ctx[index].lineTo(23,80)
        ctx[index].moveTo(30,75)
        ctx[index].lineTo(28,80)
        ctx[index].moveTo(35,75)
        ctx[index].lineTo(33,80)
        ctx[index].moveTo(40,75)
        ctx[index].lineTo(38,80)
        ctx[index].moveTo(45,75)
        ctx[index].lineTo(43,80)
        //Apoio direito
        ctx[index].moveTo(365,55)
        ctx[index].lineTo(355,75)
        ctx[index].lineTo(375,75)
        ctx[index].lineTo(365,55)
        ctx[index].moveTo(355,80)
        ctx[index].lineTo(375,80)
        //Barra
        ctx[index].moveTo(35,55)
        ctx[index].lineTo(365,55)
        //Renderizar
        ctx[index].stroke()
    })
}

function escreverTitulos(){
    let getTituloPrincipalCombinacoes = document.getElementById('titulo2')
    getTituloPrincipalCombinacoes.innerText = 'Combinações'

    let getBtnDiagramas = document.querySelectorAll('#ctn2 button')
    getBtnDiagramas[0].innerText = 'D.E.C.'
    getBtnDiagramas[1].innerText = 'D.M.F.'

    getBtnDiagramas[1].addEventListener('click',function(){
        apagarCanvas()
        desenharBasico()
        desenharMomentoFletor()
    })

    getBtnDiagramas[0].addEventListener('click',function(){
        apagarCanvas()
        desenharBasico()
        desenharEsforcoCortante()
    })

    getTitulos = document.querySelectorAll('.ctnCombinacao h3')
    getTitulos[0].innerText = 'Quase Permanente'
    getTitulos[1].innerText = 'Frequente'
    getTitulos[2].innerText = 'Rara'
    getTitulos[3].innerText = 'Última'
}

function esconderContainerResultados(){
    let mostrardepois = document.querySelector("#ctn2")
    mostrardepois.style.display = 'none'
}

function mostrarContainerResultados(){
    let mostrardepois = document.querySelector("#ctn2")
    mostrardepois.style.display = 'block'
}

function apagarCanvas(){
    let pegarCanvas = document.querySelectorAll('canvas')
    pegarCanvas.forEach((element)=>{
        let context = element.getContext('2d')
        context.clearRect(0,0,element.width,element.height)
    })
}

var combinacoes = {}
var dados = {}
function calcular(){
    let todosInputsDeCalculo = document.querySelectorAll('.inputCalc')

    let [vao, g1, g2, q, qsi1, qsi2, gamag1, gamag2, gamaq] = todosInputsDeCalculo
    dados = {
        'vao': Number(vao.value),
        'carregamentos':{'g1':primeiroCarregamentoCompleto,'g2':Number(g2.value),'q':Number(q.value)},
        'coeficientesServico':{'qsi1':Number(qsi1.value),'qsi2':Number(qsi2.value)},
        'coeficientesUltimo':{'gamag1':Number(gamag1.value),'gamag2':Number(gamag2.value),'gamaq':Number(gamaq.value)}
    }

    combinacoes = {
    'quase-permanente':{
        'cargaDistribuidaMaxima': dados['carregamentos']['g1'] + dados['carregamentos']['g2'] + dados['coeficientesServico']['qsi2'] * dados['carregamentos']['q'],
        'cargaDistribuidaMinima':dados['carregamentos']['g1'] + dados['carregamentos']['g2']
    },
    'frequente':{
        'cargaDistribuidaMaxima': dados['carregamentos']['g1'] + dados['carregamentos']['g2'] + dados['coeficientesServico']['qsi1'] * dados['carregamentos']['q'],
        'cargaDistribuidaMinima':dados['carregamentos']['g1'] + dados['carregamentos']['g2']
    },
    'rara':{
        'cargaDistribuidaMaxima': dados['carregamentos']['g1'] + dados['carregamentos']['g2'] + dados['carregamentos']['q'],
        'cargaDistribuidaMinima':dados['carregamentos']['g1'] + dados['carregamentos']['g2']

    },
    'ultima':{
        'cargaDistribuidaMaxima': (dados['carregamentos']['g1'] * dados['coeficientesUltimo']['gamag1']) + (dados['carregamentos']['g2'] * dados['coeficientesUltimo']['gamag2']) + dados['carregamentos']['q'] * dados['coeficientesUltimo']['gamaq'],
        'cargaDistribuidaMinima':(dados['carregamentos']['g1'] * dados['coeficientesUltimo']['gamag1']) + (dados['carregamentos']['g2'] * dados['coeficientesUltimo']['gamag2'])
    }
}
    combinacoes['quase-permanente'].esforcoCortanteMaximo = combinacoes['quase-permanente']['cargaDistribuidaMaxima'] * (dados['vao'])/2
    combinacoes['frequente'].esforcoCortanteMaximo = combinacoes['frequente']['cargaDistribuidaMaxima'] * (dados['vao'])/2
    combinacoes['rara'].esforcoCortanteMaximo = combinacoes['rara']['cargaDistribuidaMaxima'] * (dados['vao'])/2
    combinacoes['ultima'].esforcoCortanteMaximo = combinacoes['ultima']['cargaDistribuidaMaxima'] * (dados['vao'])/2

    combinacoes['quase-permanente'].esforcoCortanteMinimo = combinacoes['quase-permanente']['cargaDistribuidaMinima'] * (dados['vao'])/2
    combinacoes['frequente'].esforcoCortanteMinimo = combinacoes['frequente']['cargaDistribuidaMinima'] * (dados['vao'])/2
    combinacoes['rara'].esforcoCortanteMinimo = combinacoes['rara']['cargaDistribuidaMinima'] * (dados['vao'])/2
    combinacoes['ultima'].esforcoCortanteMinimo = combinacoes['ultima']['cargaDistribuidaMinima'] * (dados['vao'])/2
}

function desenharEsforcoCortante(){

    //Lembrar de transformar esse codigo todo num loop quando tiver tempo

    let escalay = 50 / combinacoes['ultima'].esforcoCortanteMaximo
    //Combinacao última Máxima 
    ctx[3].beginPath()
    ctx[3].globalAlpha = 0.4;
    ctx[3].lineWidth = 1
    ctx[3].moveTo(35,55)
    ctx[3].lineTo(35,5)
    ctx[3].moveTo(365,55)
    ctx[3].lineTo(365,105)
    ctx[3].lineTo(35,5)
    ctx[3].stroke()
    ctx[3].beginPath()
    ctx[3].fillStyle='blue';
    ctx[3].globalAlpha = 1;
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillText((combinacoes['ultima'].esforcoCortanteMaximo).toFixed(2)+' kN',15,10)
    ctx[3].fillText(((-combinacoes['ultima'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,110)

    ctx[3].stroke()

    let desl_y_EC_Ultima_Minimo = escalay * combinacoes['ultima'].esforcoCortanteMinimo
    ctx[3].beginPath()
    ctx[3].globalAlpha = 0.4;
    ctx[3].lineWidth = 1
    ctx[3].moveTo(35,55)
    ctx[3].lineTo(35,55 - desl_y_EC_Ultima_Minimo)
    ctx[3].moveTo(365,55)
    ctx[3].lineTo(365,55 + desl_y_EC_Ultima_Minimo)
    ctx[3].lineTo(35,55 - desl_y_EC_Ultima_Minimo)
    ctx[3].stroke()
    ctx[3].beginPath()
    ctx[3].globalAlpha = 1;
    ctx[3].fillStyle='red';
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillText((combinacoes['ultima'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_Ultima_Minimo)
    ctx[3].fillText(((-combinacoes['ultima'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_Ultima_Minimo)
    ctx[3].stroke()

    let desl_y_EC_Rara_Maxima = escalay * combinacoes['rara'].esforcoCortanteMaximo
    ctx[2].beginPath()
    ctx[2].globalAlpha = 0.4;
    ctx[2].lineWidth = 1
    ctx[2].moveTo(35,55)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Maxima)
    ctx[2].moveTo(365,55)
    ctx[2].lineTo(365,55 + desl_y_EC_Rara_Maxima)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Maxima)
    ctx[2].stroke()
    ctx[2].beginPath()
    ctx[2].globalAlpha = 1;
    ctx[2].fillStyle='blue';
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillText((combinacoes['rara'].esforcoCortanteMaximo).toFixed(2)+' kN',15,55 - desl_y_EC_Rara_Maxima)
    ctx[2].fillText(((-combinacoes['rara'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,60 + desl_y_EC_Rara_Maxima)
    ctx[2].stroke()

    let desl_y_EC_Rara_Minimo = escalay * combinacoes['rara'].esforcoCortanteMinimo
    ctx[2].beginPath()
    ctx[2].globalAlpha = 0.4;
    ctx[2].lineWidth = 1
    ctx[2].moveTo(35,55)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Minimo)
    ctx[2].moveTo(365,55)
    ctx[2].lineTo(365,55 + desl_y_EC_Rara_Minimo)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Minimo)
    ctx[2].stroke()
    ctx[2].beginPath()
    ctx[2].globalAlpha = 1;
    ctx[2].fillStyle='red';
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillText((combinacoes['rara'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_Rara_Minimo)
    ctx[2].fillText(((-combinacoes['rara'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_Rara_Minimo)
    ctx[2].stroke()

    let desl_y_EC_Frequente_Maxima = escalay * combinacoes['frequente'].esforcoCortanteMaximo
    ctx[1].beginPath()
    ctx[1].globalAlpha = 0.4;
    ctx[1].lineWidth = 1
    ctx[1].moveTo(35,55)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Maxima)
    ctx[1].moveTo(365,55)
    ctx[1].lineTo(365,55 + desl_y_EC_Frequente_Maxima)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Maxima)
    ctx[1].stroke()
    ctx[1].beginPath()
    ctx[1].globalAlpha = 1;
    ctx[1].fillStyle='blue';
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillText((combinacoes['frequente'].esforcoCortanteMaximo).toFixed(2)+' kN',15,55 - desl_y_EC_Frequente_Maxima)
    ctx[1].fillText(((-combinacoes['frequente'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,60 + desl_y_EC_Frequente_Maxima)
    ctx[1].stroke()

    let desl_y_EC_Frequente_Minimo = escalay * combinacoes['frequente'].esforcoCortanteMinimo
    ctx[1].beginPath()
    ctx[1].globalAlpha = 0.4;
    ctx[1].lineWidth = 1
    ctx[1].moveTo(35,55)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Minimo)
    ctx[1].moveTo(365,55)
    ctx[1].lineTo(365,55 + desl_y_EC_Frequente_Minimo)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Minimo)
    ctx[1].stroke()
    ctx[1].beginPath()
    ctx[1].globalAlpha = 1;
    ctx[1].fillStyle='red';
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillText((combinacoes['frequente'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_Frequente_Minimo)
    ctx[1].fillText(((-combinacoes['frequente'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_Frequente_Minimo)
    ctx[1].stroke()

    let desl_y_EC_QuasePermanente_Maxima = escalay * combinacoes['quase-permanente'].esforcoCortanteMaximo
    ctx[0].beginPath()
    ctx[0].globalAlpha = 0.4;
    ctx[0].lineWidth = 1
    ctx[0].moveTo(35,55)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Maxima)
    ctx[0].moveTo(365,55)
    ctx[0].lineTo(365,55 + desl_y_EC_QuasePermanente_Maxima)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Maxima)
    ctx[0].stroke()
    ctx[0].beginPath()
    ctx[0].globalAlpha = 1;
    ctx[0].fillStyle='blue';
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillText((combinacoes['quase-permanente'].esforcoCortanteMaximo).toFixed(2)+' kN',15,55 - desl_y_EC_QuasePermanente_Maxima)
    ctx[0].fillText(((-combinacoes['quase-permanente'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,60 + desl_y_EC_QuasePermanente_Maxima)
    ctx[0].stroke()

    let desl_y_EC_QuasePermanente_Minimo = escalay * combinacoes['quase-permanente'].esforcoCortanteMinimo
    ctx[0].beginPath()
    ctx[0].globalAlpha = 0.4;
    ctx[0].lineWidth = 1
    ctx[0].moveTo(35,55)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Minimo)
    ctx[0].moveTo(365,55)
    ctx[0].lineTo(365,55 + desl_y_EC_QuasePermanente_Minimo)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Minimo)
    ctx[0].stroke()
    ctx[0].beginPath()
    ctx[0].globalAlpha = 1;
    ctx[0].fillStyle='red';
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillText((combinacoes['quase-permanente'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_QuasePermanente_Minimo)
    ctx[0].fillText(((-combinacoes['quase-permanente'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_QuasePermanente_Minimo)
    ctx[0].stroke()
}

function desenharMomentoFletor(){
    let momentoMaximo =  combinacoes['ultima']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8
    let momentoPorPixel = momentoMaximo /80 //Momento necessário para deslocar 1 pixel
  
    ctx[3].beginPath()
    ctx[3].lineWidth = 1
    ctx[3].fillStyle='black';
    ctx[3].moveTo(35,55)

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['ultima']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[3].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillStyle='blue';
    ctx[3].fillText((momentoMaximo).toFixed(2)+' kNm',170,150)
    ctx[3].stroke()


    //Momento Mínimo para combinação última
    ctx[3].beginPath()
    ctx[3].lineWidth = 1
    ctx[3].fillStyle='black';
    ctx[3].moveTo(35,55)

    let proporcaoMomentoMinimoMaximoUltima = combinacoes['ultima']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoUltimo = combinacoes['ultima']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['ultima']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[3].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillStyle='red';
    ctx[3].fillText((momentoMinimoUltimo).toFixed(2)+' kNm',170,55 +(proporcaoMomentoMinimoMaximoUltima * 80)-12)
    ctx[3].stroke()


    //Momento máximo para combinação rara
    ctx[2].beginPath()
    ctx[2].lineWidth = 1
    ctx[2].fillStyle='black';
    ctx[2].moveTo(35,55)

    let proporcaoMomentoMaximoRaraMaximoUltima = combinacoes['rara']['cargaDistribuidaMaxima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMaximoRara = combinacoes['rara']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['rara']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[2].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillStyle='blue';
    ctx[2].fillText((momentoMaximoRara).toFixed(2)+' kNm',170,55+(proporcaoMomentoMaximoRaraMaximoUltima * 80)+15)
    ctx[2].stroke()


    //Momento mínimo para combinação rara
    ctx[2].beginPath()
    ctx[2].lineWidth = 1
    ctx[2].fillStyle='black';
    ctx[2].moveTo(35,55)

    let proporcaoMomentoMinimoRaraMaximoUltima = combinacoes['rara']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoRara = combinacoes['rara']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['rara']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[2].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillStyle='red';
    ctx[2].fillText((momentoMinimoRara).toFixed(2)+' kNm',170,55+(proporcaoMomentoMinimoRaraMaximoUltima * 80)-12)
    ctx[2].stroke()


    //Momento Máximo para combinação frequente
    ctx[1].beginPath()
    ctx[1].lineWidth = 1
    ctx[1].fillStyle='black';
    ctx[1].moveTo(35,55)

    let proporcaoMomentoMaximoFrequenteMaximoUltima = combinacoes['frequente']['cargaDistribuidaMaxima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMaximoFrequente = combinacoes['frequente']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['frequente']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[1].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillStyle='blue';
    ctx[1].fillText((momentoMaximoFrequente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMaximoFrequenteMaximoUltima * 80)+15)
    ctx[1].stroke()

    //Momento Mínimo para combinação frequente
    ctx[1].beginPath()
    ctx[1].lineWidth = 1
    ctx[1].fillStyle='black';
    ctx[1].moveTo(35,55)

    let proporcaoMomentoMinimoFrequenteMaximoUltima = combinacoes['frequente']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoFrequente = combinacoes['frequente']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['frequente']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[1].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillStyle='red';
    ctx[1].fillText((momentoMinimoFrequente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMinimoFrequenteMaximoUltima * 80)-12)
    ctx[1].stroke()

    //Momento Máximo para combinação quase-permanente
    ctx[0].beginPath()
    ctx[0].lineWidth = 1
    ctx[0].fillStyle='black';
    ctx[0].moveTo(35,55)

    let proporcaoMomentoMaximoQuasePermanenteMaximoUltima = combinacoes['quase-permanente']['cargaDistribuidaMaxima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMaximoQuasePermanente = combinacoes['quase-permanente']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['quase-permanente']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[0].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillStyle='blue';
    ctx[0].fillText((momentoMaximoQuasePermanente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMaximoQuasePermanenteMaximoUltima * 80)+15)
    ctx[0].stroke()

    //Momento Mínimo para combinação quase-permanente
    ctx[0].beginPath()
    ctx[0].lineWidth = 1
    ctx[0].fillStyle='black';
    ctx[0].moveTo(35,55)

    let proporcaoMomentoMinimoQuasePermanenteMaximoUltima = combinacoes['quase-permanente']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoQuasePermanente = combinacoes['quase-permanente']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['quase-permanente']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[0].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillStyle='red';
    ctx[0].fillText((momentoMinimoQuasePermanente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMinimoQuasePermanenteMaximoUltima * 80)-12)
    ctx[0].stroke()
}


function verificarInputs(){
    let getInputs = document.querySelectorAll('input[type=number]')
    let getInputsNumber = []

    getInputs.forEach((element)=>getInputsNumber.push(Number(element.value)))

    let [Vao, g1, g2, q, qsi1, qsi2, gamag1, gamag2, gamaq] = getInputsNumber

    let getMessage = document.querySelectorAll('.message')
    let deuErro = []

    getInputs.forEach((element)=>{
        if(Number(element.value) == 0){
            getMessage[0].innerHTML = "<img src=./images/icons/danger.svg>" 
            getMessage[1].innerHTML = element.name + ' não foi inserido'
            deuErro = true
        }    
    })

    if(qsi1 <= qsi2){erro("&#936<sub>1</sub> deve ser maior que &#936<sub>2</sub>"); deuErro = true}
    if(qsi1 < 0.3 || qsi1 > 1){erro("Segundo a NBR 6118-2013 Tabela 11.2 e Seção 23, &#936<sub>1</sub> deve estar entre 0,3 e 1"); deuErro = true}
    if(qsi2 < 0 || qsi2 > 0.6){erro("Segundo a NBR 6118-2013 Tabela 11.2, &#936<sub>2</sub> deve estar entre 0 e 0,6"); deuErro = true}
    if(gamag1 < 1 || gamag1 > 1.4){erro("Segundo a NBR 6118-2013 Tabela 11.1, &#947<sub>g<sub>1</sub></sub> deve estar entre 1 e 1,4"); deuErro = true}
    if(gamag2 < 1 || gamag2 > 1.4){erro("Segundo a NBR 6118-2013 Tabela 11.1, &#947<sub>g<sub>2</sub></sub> deve estar entre 1 e 1,4"); deuErro = true}
    if(gamaq < 1 || gamaq > 1.4){erro("Segundo a NBR 6118-2013 Tabela 11.1, &#947<sub>g<sub>3</sub></sub> deve estar entre 1 e 1,4"); deuErro = true}
    return deuErro
}

function erro(mensagemDeTexto){
    let getMessage = document.querySelectorAll('.message')
    getMessage[0].innerHTML = "<img src=./images/icons/danger.svg>" 
    getMessage[1].innerHTML = mensagemDeTexto
}

function sucesso(){
    
    let getMessage = document.querySelectorAll('.message')
    getMessage[0].innerHTML = "<img src=./images/icons/ok.svg>"
    getMessage[1].innerHTML = "Os dados de entrada foram inseridos com sucesso!"
}




//Código para salvar os dados e apresentar na seção "Dados Salvos"
let i = 0;
let resultados = [];
let btnSave =document.querySelector('#btnSave')
    btnSave.addEventListener('click',()=>{
    
    if(document.querySelector('#ctn2').style.display == 'none'){erro("É necessário calcular as combinações antes de salvar"); return}

    let tabelaResultados = document.querySelector('#tabelaResultados')
    let inputs = document.querySelectorAll('.inputCalc')
    let selectSelecionado = document.getElementById('selectCargas')
    let valorSelecionado = selectSelecionado.options[selectSelecionado.selectedIndex].value;

    let arrInputs = [["Figura",valorSelecionado]];
    inputs.forEach((element)=>{
        arrInputs.push([
            element.name,
            element.value
        ])
    })
    let novaLinha = tabelaResultados.insertRow()
    let novaCelula = novaLinha.insertCell()
 
    resultados.push(arrInputs)

    if(i == 0){
        let titulotabelaResultados = document.getElementById('tituloTabelaResultados')
        titulotabelaResultados.innerText = "Informações Salvas"
        tabelaResultados.classList.add('tabelaEstilizada')
    }

    novaCelula.innerHTML = "Id: " + i + "; "
    + resultados[i][0][0]+": " + resultados[i][0][1] +"; "
    + resultados[i][1][0]+": " + resultados[i][1][1] + " m;  "
    + resultados[i][2][0]+": " + resultados[i][2][1] + " kN/m;  "
    + resultados[i][3][0]+": " + resultados[i][3][1] + " kN/m;  "
    + resultados[i][4][0]+": " + resultados[i][4][1] + " kN/m;  "
    + resultados[i][5][0]+": " + resultados[i][5][1] + ";  "
    + resultados[i][6][0]+": " + resultados[i][6][1] + ";  "
    + resultados[i][7][0]+": " + resultados[i][7][1] + ";  "
    + resultados[i][8][0]+": " + resultados[i][8][1] + ";  "
    + resultados[i][9][0]+": " + resultados[i][9][1] + ";  "
    
    i++
    console.log(resultados)
})


//Funcionalidade para apagar os desenhos sempre que há uma mudança nos inputs
let pegarInputs = document.querySelectorAll('input[type=number]')

pegarInputs.forEach((element)=>{
    element.addEventListener('change',()=>{
        console.log('mudou')
        document.querySelector('#ctn2').style.display = 'none'
    })
})

