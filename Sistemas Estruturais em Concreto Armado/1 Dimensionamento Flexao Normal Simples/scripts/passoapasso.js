document.addEventListener('DOMContentLoaded',esconderhr)

function passoapasso(){

    //Passo 1
    p1lambda = document.getElementById('p1lambda');
    p1alfac = document.getElementById('p1alfac');
    
    if(fck1<=50){
        p1lambda.innerText = '0,8'
        p1alfac.innerText = '0,85'
    }else{
        p1lambda.innerHTML = '0,8 - (f<sub>ck</sub> - 50)/400 = ' + alamb.toFixed(2).toString().replace(".", ",")
        p1alfac.innerHTML = '0,85 x (1 - (f<sub>ck</sub> - 50)/200) = ' + alfac.toFixed(2).toString().replace(".", ",")
    }

    

    
    //Passo 2
    textp1 = document.getElementById('textp1')

    if(fck<=50){
        textp1.innerHTML="O concreto tem f<sub>ck</sub> igual ou abaixo de 50 MPa (concreto tipo 1), nesse caso os parâmetros são calculados da seguinte maneira:"
    }else(
        textp1.innerHTML="O concreto tem f<sub>ck</sub> superior a 50 MPa (concreto tipo 2), nesse caso os parâmetros são calculados da seguinte maneira:"
    )

    p1fck = document.getElementById('p1fck')
    p1fck.innerText = fck1.toString().replace(".", ",")

    igual = document.getElementsByClassName('igual')
    for (let item of igual) {
        item.innerText="="
    };

    p1gamac = document.getElementById('p1gamac')
    p1gamac.innerText = gamac1.toString().replace(".", ",")

    fcksobreyc = p1gamac = document.getElementById('fcksobreyc')
    console.log(gamac1)
    console.log(fck1)
    fcksobreyc.innerText = (fck1/gamac1).toFixed(2).toString().replace(".", ",") +' MPa'
    
    igual = document.getElementsByClassName('seta')
    for (let item of igual) {
        item.innerHTML='&#8594'
    };

    p1fcd= document.getElementById('p1fcd')
    p1fcd.innerHTML="f<sub>cd</sub>"

    document.getElementById('fcksobreycsobre10').innerText = ((fck1/gamac1)/10).toFixed(2).toString().replace(".", ",") +' kN/cm²'
    
    alfacxfcd = document.getElementById('alfacxfcd')
    alfacxfcd.innerText = alfac.toFixed(2).toString().replace(".", ",") + " x " +((fck1/gamac1)/10).toFixed(2).toString().replace(".", ",")

    p2ressigmacd = document.getElementById('p2ressigmacd')
    p2ressigmacd.innerText = (alfac*((fck1/gamac1)/10)).toFixed(2).toString().replace(".", ",") + ' kN/cm²'

    p2fyk = document.getElementById('p2fyk')
    p2fyk.innerText = (fyk1/10).toString().replace(".", ",")

    p2gamas = document.getElementById('p2gamas')
    p2gamas.innerText = (gamas1).toString().replace(".", ",")

    p2resfydsobregamas = document.getElementById('p2resfydsobregamas')
    p2resfydsobregamas.innerText = (fyk1/((gamas1*10))).toFixed(2).toString().replace(".", ",") + ' kN/cm²'

    p2calcMd = document.getElementById('p2calcMd')
    p2calcMd.innerHTML = amk1.toString().replace(".", ",") + ' x ' + gamaf1.toString().replace(".", ",")

    document.getElementById('resMd').innerText = (amd/100).toString().replace(".", ",") + ' kNm'


    //Passo 3

    p3calcmisup = document.getElementById('p3calcmisup')
    p3calcmiinf = document.getElementById('p3calcmiinf')

    p3calcmisup.innerHTML = amd.toString().replace(".", ",")
    p3calcmiinf.innerHTML = b1.toString().replace(".", ",") + ' x '+ d1.toString().replace(".", ",")+'²' +' x ' + (alfac*((fck1/gamac1)/10)).toFixed(2).toString().replace(".", ",") 

    p3resmi = document.getElementById('p3resmi')
    p3resmi.innerText = ami.toFixed(3).toString().replace(".", ",")

    p3calcmilim = document.getElementById('p3calcmilim')
    p3calcmilim.innerText = alamb.toFixed(2).toString().replace(".", ",") +' x ' + qlim.toFixed(2).toString().replace(".", ",")+' x '+'(1 - 0,5 ' + ' x ' + alamb.toFixed(2).toString().replace(".", ",") + ' x ' +qlim.toFixed(2).toString().replace(".", ",")+')'

    p3resmilim = document.getElementById('p3resmilim')
    p3resmilim.innerText = amilim.toFixed(4).toString().replace(".", ",")

    p1xi = document.getElementById('p1xi')
    if(fck<=50){
    p1xi.innerHTML = '0,8 x &#946 - 0,35'  
    }else{
    p1xi.innerHTML = '0,8 x &#946 - 0,45'  
    }

    p1resxi = document.getElementById('p1resxi')
    p1resxi.innerText = qlim.toFixed(2).toString().replace(".", ",")

    p3res = document.getElementById('p3res')
    if(ami <= amilim){
        p3res.innerHTML = "Como: &#181<sub>lim</sub> >= &#181, deve-se utilizar armadura simples"
        armaduraSimples();
    }else{
        p3res.innerHTML = "Como: &#181 >= &#181<sub>lim</sub>, deve-se utilizar armadura dupla"
        armaduraDupla();
    }

}

    //Passo 4 
    function armaduraSimples(){
        let buttonP4 = document.getElementById('buttonP4')
        buttonP4.innerText="Passo 4: Determinar a área mínima da armadura tracionada"

        let info4_1 = document.getElementById('info4_1')
        info4_1.innerHTML = '&#958'
    
        let info4_1_3_1parcial = '(1 - 2 x &#181)'
        
        let info4_1_3_1 = document.getElementById('info4_1_3_1')
        let info4_1_3_2 = document.getElementById('info4_1_3_2')
        info4_1_3_1.innerHTML = '1 - &#8730' + info4_1_3_1parcial
        info4_1_3_2.innerHTML = '&#955'
    
        let info4_2 = document.getElementById('info4_2')
        info4_2.innerHTML = '&#958'
    
        let info4_2_1 = document.getElementById('info4_2_1')
        info4_2_1.innerHTML = qsi.toFixed(2).toString().replace(".", ",")

        let info4_3 = document.getElementById('info4_3')
        info4_3.innerHTML = 'A <sub>s</sub>'

        let info4_3_1_1 = document.getElementById('info4_3_1_1')
        info4_3_1_1.innerHTML = '&#955 x &#958 x b x d x σ<sub>cd</sub>'   //Pegar ocd do passo 2

        let info4_3_3_2 = document.getElementById('info4_3_3_2')
        info4_3_3_2.innerHTML = "f<sub>cd</sub>"
         
        let info4_4 = document.getElementById('info4_4')
        info4_4.innerHTML = 'A <sub>s</sub>'

        let info4_4_1_1 = document.getElementById('info4_4_1_1')
        info4_4_1_1.innerHTML = alamb.toFixed(2).toString().replace(".", ",") + " x " + qsi.toFixed(2).toString().replace(".", ",") + " x " + b1 + " x " + d1 + " x " + (alfac*((fck1/gamac1)/10)).toFixed(2).toString().replace(".", ",")
         
        let info4_4_1_2 = document.getElementById('info4_4_1_2')
        info4_4_1_2.innerText = (fyk1/((gamas1*10))).toFixed(2)
        
        let info4_5 = document.getElementById('info4_5')
        info4_5.innerHTML = "Teremos armadura simples: A<sub>s</sub>= " + aas.toFixed(2) + " cm² e A'<sub>s</sub>= 0 cm² "
    } 

function esconderhr(){

    let all_tag_hr = document.querySelectorAll('hr')
    let hr_aparecer = document.querySelectorAll('.hr-aparecer')

    all_tag_hr.forEach((element)=>{
        element.style.display = 'none'
    })
    hr_aparecer.forEach((element)=>{
        element.style.display = 'block'
    })
}

function mostrarhr(){
    let all_tag_hr = document.querySelectorAll('hr')
    all_tag_hr.forEach((element)=>{
        element.style.display = 'block'
    })
}
