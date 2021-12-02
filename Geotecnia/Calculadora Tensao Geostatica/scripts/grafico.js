function grafico(){
  if(clique=!0){
    document.getElementById('myChart').remove();
    ctn = document.getElementById('centralizar');
    let novocanvas = document.createElement('canvas');
    novocanvas.id="myChart";
    ctn.appendChild(novocanvas);
    clique++
  }

  
  let ctx2 = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx2, {
    data: {
      labels: cotasfinais,
      datasets: [
        {
          type: "line",
          label: "Tensão Total ",
          data: tensaototal,
          backgroundColor: ["rgba(0, 0, 255, 0.4)"],
          borderColor: ["rgba(0, 0, 255, 1)"],
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Poropressão",
          data: poropressao,
          backgroundColor: ["rgba(0, 130, 130, 0.4)"],
          borderColor: ["rgba(0, 130, 130, 1)"],
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Tensão Efetiva",
          data: tensaoefetiva,
          backgroundColor: ["rgba(180, 130, 0, 0.4)"],
          borderColor: ["rgba(180, 130, 0, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      aspectRatio: 1,
      plugins: {
        legend: {
          position: "top",
        },
      },

      scales: {
        x: {
          grace: 0,
          type: "linear",

          display: true,
          title: {
            display: true,
            text: "KPa",
          },
        },
        y: {
          grace: 0,
          type: "linear",
          display: true,
          //grace: 1000, //Diz qual o valor limite do eixo, se for 1000 por exemplo e o valor máximo for de 800, nesse caso o valor limite do eixo será 1800
          title: {
            display: true,
            text: "Cotas",
            stepSize:1,
          },
           
        }
      },
      animation: {
        duration: 1500,
      },
    },
  });
}

