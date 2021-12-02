function NAmaior() {
  let inputscotas = document.querySelectorAll(".inputcota");
  let inputsgamas = document.querySelectorAll(".inputgama");
  let inputNA = document.getElementById("inputNA");
  valuecotas = [];
  valuegamas = [];
  valueNA = Number(inputNA.value);

  //Pegando os values das cotas e dos gamas
  for (var i = 0; i < inputscotas.length; i++) {
    valuecotas[i] = Number(inputscotas[i].value);
  }
  for (var i = 0; i < inputsgamas.length; i++) {
    valuegamas[i] = Number(inputsgamas[i].value);
  }

  //Criando um array com as cotas das camadas e a cota do NA
  cotassemNA = [...valuecotas];

  valuecotas.push(Number(inputNA.value));
  cotascomNA = [...valuecotas];

  //Cotas máximas e mínimas sem considerar a cota do NA
  let cotamaximasemNA = Math.max(...cotassemNA);

  //Enumerei em ordem crescente e depois inverte
  cotascomNA = cotascomNA.sort(sortfunction);
  cotascomNA = cotascomNA.reverse();
  cotassemNA = cotassemNA.sort(sortfunction);
  cotassemNA = cotassemNA.reverse();

  //Pegando a variação das cotas em cada camada
  let diferencacota = [];
  for (let i = 0; i < cotassemNA.length - 1; i++) {
    diferencacota[i] = cotassemNA[i] - cotassemNA[i + 1];
  }

  // Calcular a tensão total na cota inicial, onde há troca de camadas, no NA e na cota final
  // Calcular a tensao total devido ao peso de solo
  tensaototal = [];
  tensaototal[0] = 0;
  poropressao = [];

  // Caso haja agua acima da primeira camada de solo, é necessário acrescentar a coluna de água na tensão total
  tensaototal[1] = (valueNA - cotamaximasemNA) * 10;

  for (i = 0; i < cotassemNA.length - 1; i++) {
    tensaototal[i + 2] = tensaototal[i + 1] + valuegamas[i] * diferencacota[i];
  }

  for (i = 0; i < cotascomNA.length; i++) {
    poropressao[i] = (valueNA - cotascomNA[i]) * 10;
  }

  tensaoefetiva = [];

  for (let i = 0; i < poropressao.length; i++) {
    tensaoefetiva[i] = tensaototal[i] - poropressao[i];
  }
  cotasfinais=[];
  cotasfinais=cotascomNA;

  grafico();
}

function sortfunction(a, b) {
  return a - b;
}
