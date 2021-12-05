let fck = [20,25,30,35,40,45,50,55,60,65,70,75,80,85,90];
let inicial =[]; //CEB-90
let secante=[]; //CEB-90
let inicial2 =[]; //NBR - 6118
let secante2 =[]; //NBR - 6118
let a=[]; //Para verificar se o alfa é menor que 1
let secantebasalto=[]; //NBR - 6118
let secantecalcario=[]; //NBR - 6118
let secantearenito=[]; //NBR - 6118


for(let j = 0; j<fck.length; j++){
inicial[j] = 21500*Math.pow(((fck[j]+8)/10),(1/3)); // Módulo Tangente ou inicial CEB-90
secante[j] = inicial[j]*0.85; // Modulo Secante CEB-90
}

for(let j = 0; j<fck.length; j++){
    a[j] = 0.8 + 0.2 * fck[j]/80;

    if(a[j]>1){
        a[j]=1;
    }

    if(fck[j]<=50){
        inicial2[j] = 5600*Math.sqrt(fck[j]); //Módulo Inicial NBR 6118 para fck <= 50MPA
        secante2[j] = a[j]*inicial2[j]; // Módulo Secante NBR 6118
    }else{
        inicial2[j] = 21500*Math.pow(((fck[j]+12.5)/10),(1/3)); //Módulo Inicial NBR 6118 para fck > 50MPA
        secante2[j] = a[j]*inicial2[j]; // Módulo Secante NBR 6118
    }

    secantebasalto[j] = a[j] * secante2[j] *1.2;
    secantecalcario[j] = a[j] * secante2[j] *0.9;
    secantearenito[j] = a[j] * secante2[j] *0.7;

}

let basalto = inicial2.map(x => 1.2* x);
let calcario = inicial2.map(x => 0.9* x);
let arenito = inicial2.map(x => 0.7* x);



//Criação do canva

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: fck,
        datasets: [
            {
            label: 'CEB-90',
            data: inicial,
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',   
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Granito e Gnaisse',
            data: inicial2,
            backgroundColor: [
                'rgba(54, 162, 235, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Basalto',
            data: basalto,
            backgroundColor: [
                'rgba(54, 162, 100, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 162, 100, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Calcário',
            data: calcario,
            backgroundColor: [
                'rgba(54, 30, 100, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 30, 100, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Arenito',
            data: arenito,
            backgroundColor: [
                'rgba(54, 30, 50, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 30, 50, 1)',     
            ],
            borderWidth: 1
        }

    ]   
    },
    options: {
        scales: {
            x:{ 
                display:true,
                title:{
                    display:true,
                    text:"Resistência do Concreto em MPA"
                }
                
            },
            y:{ 
                display:true,
                title:{
                    display:true,
                    text:"Módulo de Def. Longitudinal"
                }
                
            },
        },
        animation:{
            duration: 1500,
        }, 
    }
});

// Segundo canva

let ctx2 = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: fck,
        datasets: [
            {
            label: 'CEB-90',
            data: secante,
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',   
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Granito e Gnaisse',
            data: secante2,
            backgroundColor: [
                'rgba(54, 162, 235, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Basalto',
            data: secantebasalto,
            backgroundColor: [
                'rgba(54, 162, 100, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 162, 100, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Calcário',
            data: secantecalcario,
            backgroundColor: [
                'rgba(54, 30, 100, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 30, 100, 1)',     
            ],
            borderWidth: 1
        },
        {
            label: 'NBR-6118 - Arenito',
            data: secantearenito,
            backgroundColor: [
                'rgba(54, 30, 50, 0.4)',   
            ],
            borderColor: [
                'rgba(54, 30, 50, 1)',     
            ],
            borderWidth: 1
        }

    ]   
    },
    options: {
        scales: {
            x:{ 
                display:true,
                title:{
                    display:true,
                    text:"Resistência do Concreto em MPA"
                }
                
            },
            y:{ 
                display:true,
                title:{
                    display:true,
                    text:"Módulo de Def. Longitudinal"
                }
                
            },
        },
        animation:{
            duration: 1500,
        }, 
    }
});