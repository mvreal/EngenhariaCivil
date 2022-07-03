let formTransversal = document.getElementById('formTransversal')

formTransversal.addEventListener('change',()=>{
    let checkedFormTransversal = document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
    let tabelaInputsObrigatorios = document.getElementById('inputsObrigatorios')
    let tabelaInputsOpcionais = document.getElementById('inputsOpcionais')
    let ctnInfo = document.getElementById('ctnInfo')
    

    ctnInfo.style.display = 'flex'
    let optionalTitle = document.getElementById('optionalTitle')
    resetInputs()

    switch(checkedFormTransversal) {
        case 'retangulo':
            optionalTitle.style.display = 'none'
            createTables(tabelaInputsObrigatorios, tabelaInputsOpcionais, 2, 0)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            insertUnit()
            recParams()
            
        break

        case 'triangulo':
            optionalTitle.style.display = 'block'
            createTables(tabelaInputsObrigatorios, tabelaInputsOpcionais, 4, 2)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            insertUnit()
            tParams()
        break

        case 'i':
            optionalTitle.style.display = 'block'
            createTables(tabelaInputsObrigatorios, tabelaInputsOpcionais, 6, 4)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            insertUnit()
            iParams()
        break

        case 'ditto':
            optionalTitle.style.display = 'none'
            createTables(tabelaInputsObrigatorios, tabelaInputsOpcionais, 3, 0)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            insertUnit()
            dittoParams()
        break
        }
    }      

)

function resetInputs(){
    if(!!document.querySelector('#inputsObrigatorios>tbody>tr>td') == true){
        let deleteRows = document.querySelectorAll('#inputsObrigatorios>tbody>tr,#inputsOpcionais>tbody>tr')
        

        deleteRows.forEach((element=>{
            element.remove()
        }))
    }

    
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    let message = document.querySelectorAll('.message')

    resArea.innerText = ''
    InerciaBaricentricaX.innerText = ''

    message[0].innerHTML=''
    message[1].innerHTML='Todos os alertas estarão aqui!'

}

function createTables(mandatoryElement, optionalElement, mandatoryRowNumber, optionalRowNumber){
    for(let i = 0; i<mandatoryRowNumber; i++){
        mandatoryElement.insertRow()
    }
    for(let i = 0; i<optionalRowNumber; i++){
        optionalElement.insertRow()
    }
}

function insertCell(){
    let allRows = document.querySelectorAll('#inputsObrigatorios>tbody>tr,#inputsOpcionais>tbody>tr')
    allRows.forEach((element)=>{
        element.insertCell()
        element.insertCell()
        element.insertCell()
    })
}

function insertInputs(){
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    let message = document.querySelectorAll('.message')
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    for(let i = 0; i<allDataCell.length; i++){
        if((i+2) % 3 == 0){
            allDataCell[i].innerHTML = "<input type='number' min='0' class='numberInput'></input>"
            allDataCell[i].addEventListener('change',()=>{
                resArea.innerText = ''
                InerciaBaricentricaX.innerText = ''
            
                message[0].innerHTML=''
                message[1].innerHTML='Todos os alertas estarão aqui!'
            })
        }
    }
    
}

function insertUnit(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    for(let i = 0; i<allDataCell.length; i++){
        if((i+1) % 3 == 0){
            allDataCell[i].innerText = 'cm'
        }
    }
}

function recParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerText = 'b'
    allDataCell[3].innerText = 'h'
}

function tParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerHTML = 'b<sub>f</sub>'
    allDataCell[3].innerHTML = 'h<sub>f</sub>'

    allDataCell[6].innerHTML = 'b<sub>w</sub>'
    allDataCell[9].innerHTML = 'h'

    allDataCell[12].innerHTML = 'b<sub>mis</sub>'
    allDataCell[15].innerHTML = 'h<sub>mis</sub>'
}

function iParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerHTML = 'b<sub>f</sub>'
    allDataCell[3].innerHTML = 'h<sub>f</sub>'

    allDataCell[6].innerHTML = 'b<sub>w</sub>'
    allDataCell[9].innerHTML = 'h'

    allDataCell[12].innerHTML = 'b<sub>i</sub>'
    allDataCell[15].innerHTML = 'h<sub>i</sub>'

    allDataCell[18].innerHTML = 'b<sub>mis-sup</sub>'
    allDataCell[21].innerHTML = 'h<sub>mis-sup</sub>'

    allDataCell[24].innerHTML = 'b<sub>mis-inf</sub>'
    allDataCell[27].innerHTML = 'h<sub>mis-inf</sub>'
}

function dittoParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerHTML = 'h'
    allDataCell[3].innerHTML = 'A'

    allDataCell[6].innerHTML = 'I<sub>xg</sub>'

    allDataCell[5].innerHTML = 'cm²'
    allDataCell[8].innerHTML = 'cm⁴'
}

function showImage(checkedFormTransversal){

    let ctnimg = document.getElementById('ctnimg')
    switch(checkedFormTransversal) {
        case 'retangulo':
              ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/rec.png'></img>"
        break

        case 'triangulo':
            ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/t.png'</img>"
        break

        case 'i':
            ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/i.png'</img>"
        break

        case 'ditto':
            ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/ditto.png'</img>"
        break
    }
}      
var resposta = []
let btnCalc = document.getElementById('btnCalc')
btnCalc.addEventListener('click',()=>{

    let resArea = document.getElementById('resArea')
    let resInerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    
    

    let message = document.querySelectorAll('.message')
    let inputs = document.querySelectorAll('.numberInput')

      try{
        document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
      }  
        catch(e){
            erro("A seção transversal não foi definida, clique em uma das imagens")
            return
        }

    
        let checkedFormTransversal = document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
    

    let arrInputs = Array.from(inputs)
    let numberInputs = []


    arrInputs.forEach((element)=>{
        numberInputs.push(Number(element.value))
    })

    resetMassage(message)
    switch(checkedFormTransversal) {

        case 'retangulo':
            var [b,h] = numberInputs
            resposta = verificacaoVigaRet(resArea,resInerciaBaricentricaX,b,h)
        break

        case 'triangulo':
            var [bf,hf,bw,h,bmis,hmis] = numberInputs
            resposta = verificacaoVigaT(resArea,resInerciaBaricentricaX,bf,hf,bw,h,bmis,hmis,message)
        break

        case 'i':
            var [bf,hf,bw,h,bi,hi,bmissup,hmissup,bmisinf,hmisinf] = numberInputs
            resposta = verificacaoVigaI(resArea,resInerciaBaricentricaX,bf,hf,bw,h,bi,hi,bmissup,hmissup,bmisinf,hmisinf,message)
            break

        case 'ditto':
            
        break
    }
})

function resetMassage(message){
    message[0].innerHTML = ""
    message[1].innerHTML = ""
}

function verificacaoVigaRet(resArea,resInerciaBaricentricaX,b,h){
    let area = b*h
    resArea.innerText = decimalNotationToCientificNotation(area)

    let ixg = b* (h**3) / 12 
    resInerciaBaricentricaX.innerText = decimalNotationToCientificNotation(ixg)

    if(b == ""){erro("A largura da viga (b) não foi definida");return}
    if(h == ""){erro("A altura da viga (h) não foi definida");return}

    sucess(message)
    return {
        tipo:'Retângular',
        slug:"&#9608",
        area: area,
        ixg: ixg,
        dados:{
            b: b,
            h: h
        }
    }
}

    
function verificacaoVigaT(resArea,resInerciaBaricentricaX,bf,hf,bw,h,bmis,hmis,message){
    if(bmis == ""){bmis = 0}
    if(hmis == ""){hmis = 0}

    if(bf == 0){erro("A largura da mesa (b<sub>f</sub>) não foi inserida"); return}
    if(hf == 0){erro("A altura da mesa (h<sub>f</sub>) não foi inserida"); return}
    if(bw == 0){erro("A largura da alma (b<sub>w</sub>) não foi inserida"); return}
    if(h == 0){erro("A altura total da viga (h) não foi inserida"); return}
    if(hf >= h){erro("A altura da mesa (h<sub>f</sub>) não deve ser maior ou igual que a altura da viga (h)"); return}
    if(bw >= bf){erro("A largura da alma (b<sub>w</sub>) não deve ser maior que a largura da mesa (b<sub>f</sub>) disponível"); return}
    if(bmis > ((bf-bw)/2)){erro("A largura da mísula (b<sub>mis</sub>) deve estar contida na largura da mesa (b<sub>f</sub>) disponível"); return}
    if(hmis > (h-hf)){erro("A altura da mísula (h<sub>mis</sub>) deve estar contida na altura disponível da alma"); return}
    sucess()

    let areaMesa = bf * hf
    let areaAlma = bw*(h - hf)
    let areaMisula = hmis * bmis /2

    let area = areaMesa + areaAlma + (2 * areaMisula)
    resArea.innerText = decimalNotationToCientificNotation(area)

    let centroideYMesa = (h - (hf/2))
    let centroideYAlma = ((h-hf)/2)
    let centroideYMisula = ((h - hf) - (hmis/3))

    let produtoCentroideYAreaMesa = centroideYMesa * areaMesa 
    let produtoCentroideYAreaAlma = centroideYAlma * areaAlma
    let produtoCentroideYAreaMisula = centroideYMisula * areaMisula

    let centroideY = (produtoCentroideYAreaMesa + produtoCentroideYAreaAlma + (2 * produtoCentroideYAreaMisula))/area

    let ixgMesa = ((bf * (hf**3))/12) + (areaMesa * ((centroideY - centroideYMesa)**2))
    let ixgAlma = ((bw * ((h-hf)**3))/12) + (areaAlma * ((centroideY - centroideYAlma)**2))
    let ixgMisula = ((bmis * (hmis**3))/36) + (areaMisula * ((centroideY - centroideYMisula)**2))
    let ixg = ixgMesa + ixgAlma + ixgMisula + ixgMisula

    resInerciaBaricentricaX.innerText = decimalNotationToCientificNotation(ixg)
    return {
        tipo:"T",
        slug:"T",
        area: area,
        ixg: ixg,
        dados:{
            bf: bf,
            hf: hf,
            bw: bw,
            h: h,
            bmis: bmis,
            hmis: hmis
        }
    }
}

function verificacaoVigaI(resArea,resInerciaBaricentricaX,bf,hf,bw,h,bi,hi,bmissup,hmissup,bmisinf,hmisinf,message){

    if(bmissup == ""){
        bmissup = 0
    }
    if(hmissup == ""){
        hmissup = 0
    }

    if(bmisinf == ""){
        bmisinf = 0
    }
    if(hmisinf == ""){
        hmisinf = 0
    }
    if(bf == 0){erro("A largura da mesa (b<sub>f</sub>) não foi inserida"); return}
    if(hf == 0){erro("A altura da mesa superior (h<sub>f</sub>) não foi inserida"); return}
    if(bw == 0){erro("A largura da alma (b<sub>w</sub>) não foi inserida"); return}
    if(h == 0){erro("A altura total da viga (h) não foi inserida"); return}
    if(bi == 0){erro("A largura da mesa inferior (b<sub>i</sub>) não foi inserida"); return}
    if(hi == 0){erro("A altura da mesa inferior (h<sub>i</sub>) não foi inserida"); return}
    if(hf >= h-hi){erro("A altura da mesa superior (h<sub>f</sub>) não deve ser maior ou igual que a altura da viga menos a altura da mesa inferior (h - h<sub>i</sub>)"); return}
    if(hi >= h-hf){erro("A altura da mesa inferior (h<sub>i</sub>) não deve ser maior ou igual que a altura da viga menos a altura da mesa superior (h - h<sub>f</sub>)"); return}
    if(hi >= h){erro("A altura da mesa (h<sub>i</sub>) não deve ser maior ou igual que a altura da viga (h)");return}
    if(hi+hf >= h){erro("A altura das mesas (h<sub>i</sub> + h<sub>f</sub>) não deve ser maior ou igual que a altura da viga (h)");return}
    if(bmissup >(bf-bw)/2){erro("A largura da missula superior (b<sub>mis-sup</sub>) não deve ser maior que a largura disponível da mesa superior");return}
    if(bmisinf >(bi-bw)/2){erro("A largura da missula inferior (b<sub>mis-sup</sub>) não deve ser maior que a largura disponível da mesa inferior");return}
    if(hmissup > h - hf - hi - hmisinf){erro("A altura da missula superior (h<sub>mis-sup</sub>) não deve ser maior que a seção disponível da alma");return}
    if(hmisinf > h - hf - hi - hmissup){erro("A altura da missula inferior (h<sub>mis-sup</sub>) não deve ser maior que a seção disponível da alma");return}
    //Mensagem de sucesso após verificar que nenhum erro aconteceu
    
    sucess()

    //Rotina para calcular as propriedades Geométricas

    let areaMesaSuperior = bf * hf
    let areaAlma = bw * (h-hf-hi)
    let areaMesaInferior = bi * hi
    let areaMisulaSuperior = (bmissup * hmissup)/2
    let areaMisulaInferior = (bmisinf * hmisinf)/2

    let centroideYMesaSuperior = h-(hf/2)
    let centroideYAlma = hi + ((h-hi-hf)/2)
    let centroideYMesaInferior = hi/2
    let centroideYMisulaSuperior = h-hf-(hmissup/3)
    let centroideYMisulaInferior = hi + (hmisinf/3)

    let produtoCentroideYAreaMesaSuperior = centroideYMesaSuperior * areaMesaSuperior
    let produtoCentroideYAreaMesaInferior = centroideYMesaInferior * areaMesaInferior
    let produtoCentroideYAreaAlma = centroideYAlma * areaAlma
    let produtoCentroideYAreaMisulaSuperior = centroideYMisulaSuperior * areaMisulaSuperior
    let produtoCentroideYAreaMisulaInferior = centroideYMisulaInferior * areaMisulaInferior

    let area = areaMesaSuperior + areaMesaInferior + areaAlma + (2*areaMisulaSuperior) + (2*areaMisulaInferior)
    resArea.innerText = decimalNotationToCientificNotation(area)

    let centroideY = (produtoCentroideYAreaMesaSuperior + produtoCentroideYAreaMesaInferior + produtoCentroideYAreaAlma + (2*produtoCentroideYAreaMisulaSuperior) + (2*produtoCentroideYAreaMisulaInferior))/area

    let ixgMesaSuperior = ((bf * (hf**3))/12) + (areaMesaSuperior * ((centroideY - centroideYMesaSuperior)**2))
    let ixgAlma = (bw * ((h-hf-hi)**3)/12) + (areaAlma * ((centroideY - centroideYAlma)**2))
    let ixgMesaInferior = ((bi * (hi**3))/12)+ (areaMesaInferior * ((centroideY - centroideYMesaInferior)**2))
    let ixgMisulaSuperior = ((bmissup * (hmissup**3))/36) + (areaMisulaSuperior * ((centroideY - centroideYMisulaSuperior)**2))
    let ixgMisulainferior = ((bmisinf * (hmisinf**3))/36) + (areaMisulaInferior * ((centroideY - centroideYMisulaInferior)**2))

    let ixg = (ixgMesaSuperior + ixgMesaInferior + ixgAlma + (2 * ixgMisulaSuperior) + (2 * ixgMisulainferior))

    resInerciaBaricentricaX.innerText = decimalNotationToCientificNotation(ixg)
    return {
        tipo:'I',
        slug:"&#9014",
        area: area,
        ixg: ixg,
        dados:{
            bf: bf,
            hf: hf,
            bw: bw,
            h: h,
            bi: bi,
            hi: hi,
            bmissup: bmissup,
            hmissup: hmissup,
            bmisins: bmisinf,
            hmisinf: hmisinf
        }
    }
}


document.addEventListener('keydown',function (e) {
    if(e.key === '-'){
        e.preventDefault();
    }
})
       
    
function sucess(){
    let message = document.querySelectorAll('.message')
    message[0].innerHTML = "<img src=./images/icons/ok.png>"
    message[1].innerHTML = "Os parâmetros da seção foram calculados com sucesso"
    return message[1].innerHTML
}

function erro(resposta){
    let message = document.querySelectorAll('.message')
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    
    message[0].innerHTML = "<img src=./images/icons/danger.png>" 
    message[1].innerHTML = resposta

    resArea.innerHTML = ""
    InerciaBaricentricaX.innerText = ""       
}


function decimalNotationToCientificNotation(number, intereger = 3, float = 2){
    
    let countDigits = 1
    let copynumber = number
 
    while(copynumber>=10){
        countDigits++
        copynumber /= 10
    }

    if(number>10**intereger){
        number /= (10**(countDigits-intereger))
        number = number.toFixed(float)
        return(number + ' E+' + (countDigits-intereger))
    }
    return number.toFixed(2);
}

var resetResults = ()=>{
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    let message = document.querySelectorAll('.message')

    resArea.innerText = ''
    InerciaBaricentricaX.innerText = ''

    message[0].innerHTML=''
    message[1].innerHTML='Todos os alertas estarão aqui!'
}


var respostasSalvas = []
var contadorDeRespostasSalvas = 0

let btnSave = document.getElementById('btnSave')
btnSave.addEventListener('click',()=>{


    try{
        document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
      }  
        catch(e){
            erro("A seção transversal não foi definida, clique em uma das imagens")
            return
        }

    let titleSave = document.getElementById('titleSave')
    let message = document.querySelectorAll('.message')
    let tableSave = document.getElementById('tableSave')
    


    if((titleSave.innerText == '') && (message[1].innerText == "Os parâmetros da seção foram calculados com sucesso")){
        titleSave.innerText = "Seções Salvas"
        let createThead = document.createElement('thead')
        let createTr = document.createElement('tr')
        let createTh = [document.createElement('th'),document.createElement('th'),document.createElement('th'),document.createElement('th')]
        var createTbody = document.createElement('tbody')

        tableSave.appendChild(createThead)
        tableSave.appendChild(createTbody)
        createTbody.classList.add('textAlignCenter')
        createThead.appendChild(createTr)
        createTh.forEach((element)=>{
            createTr.appendChild(element)
        })

        createTh[0].innerText = "Número"
        createTh[1].innerText = "Figura"
        createTh[2].innerText = "Área (cm²)"
        createTh[3].innerText = "Ixg (cm⁴)"
        createTh[2].classList.add('mediumInput')
        createTh[3].classList.add('mediumInput')


    }

    if(message[1].innerText == "Os parâmetros da seção foram calculados com sucesso"){
    

        let createTr = document.createElement('tr')
        let createTd = [document.createElement('td'),document.createElement('td'),document.createElement('td'),document.createElement('td')]
        respostasSalvas.push(resposta)
        let getTBody = document.querySelector('#tableSave>tbody')
        

        getTBody.appendChild(createTr)
        createTd.forEach((element)=>{
            createTr.appendChild(element)
        })

        let getUpdateTr = document.querySelectorAll('#tableSave>tbody>tr')[contadorDeRespostasSalvas]
        let getUpdateTd = getUpdateTr.querySelectorAll('td')

        getUpdateTd[0].innerHTML = contadorDeRespostasSalvas+1
        getUpdateTd[1].innerHTML = respostasSalvas[contadorDeRespostasSalvas].slug
        getUpdateTd[2].innerHTML = decimalNotationToCientificNotation(respostasSalvas[contadorDeRespostasSalvas].area)
        getUpdateTd[3].innerHTML = decimalNotationToCientificNotation(respostasSalvas[contadorDeRespostasSalvas].ixg)

        if(respostasSalvas[contadorDeRespostasSalvas].slug == "T"){
            getUpdateTd[1].classList.add('mediumText')
        }
        contadorDeRespostasSalvas++

        
    }

})

document.getElementById('nextApp').addEventListener('click',()=>{
     
    console.log(respostasSalvas)
})
