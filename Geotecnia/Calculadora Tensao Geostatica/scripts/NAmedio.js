function NAmedio() {
  let inputscotas = document.querySelectorAll(".inputcota");
  let inputsgamas = document.querySelectorAll(".inputgama");
  let inputNA = document.getElementById("inputNA");
  valuecotas = [];
  valuegamas = [];
  valueNA = Number(inputNA.value);

  for (var i = 0; i < inputscotas.length; i++) {
    valuecotas[i] = Number(inputscotas[i].value);
  }

  for (var i = 0; i < inputsgamas.length; i++) {
    valuegamas[i] = Number(inputsgamas[i].value);
  }

  //Criando um array com as cotas das camadas sem a cota do NA
  cotassemNA = [...valuecotas];

  //Descobrir em qual camada está o NA
  for (let i = 0; i < cotassemNA.length; i++) {
    if (valueNA >= cotassemNA[i]) {
      var posicao = i;
  
      corte1 = valuegamas.slice(0, i);
      corte2 = valuegamas.slice(i);

      gamasfinais = [...corte1, corte1[i - 1], ...corte2];
      break;
    }
  }

  //pegar todas as cotas com o NA
  valuecotas.push(Number(inputNA.value));
  cotascomNA = [...valuecotas];

  cotascomNA = cotascomNA.sort(sortfunction);
  function sortfunction(a, b) {
    return a - b;
  }
  cotascomNA.reverse();

  tensaototal = [];
  tensaototal[0] = 0;
  for (let i = 0; i < gamasfinais.length; i++) {
    tensaototal[i + 1] =
      tensaototal[i] + (cotascomNA[i] - cotascomNA[i + 1]) * gamasfinais[i];
  }

  poropressao = [];
  for (let i = 0; i < cotascomNA.length; i++) {
    poropressao[i] = (valueNA - cotascomNA[i]) * 10;
    if (poropressao[i] < 0) {
      poropressao[i] = 0;
    }
  }
  tensaoefetiva = [];
  for (i = 0; i < poropressao.length; i++) {
    tensaoefetiva[i] = tensaototal[i] - poropressao[i];
  }
  cotasfinais = [];
  cotasfinais = cotascomNA;
  
   grafico();
}
