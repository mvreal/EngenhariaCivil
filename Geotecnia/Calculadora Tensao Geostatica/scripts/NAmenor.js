function NAmenor() {
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

  //pegar todas as cotas com o NA
  valuecotas.push(Number(inputNA.value));
  cotascomNA = [...valuecotas];

  cotascomNA = cotascomNA.sort(sortfunction);
  function sortfunction(a, b) {
    return a - b;
  }
  cotascomNA.reverse();

  tensaototal = [];
  poropressao=[];
  tensaototal[0] = 0;
  poropressao[0] = 0;
  tensaoefetiva = [];

  for (let i = 0; i < valuecotas.length-2; i++) {
    tensaototal[i + 1] =
      tensaototal[i] + (cotascomNA[i] - cotascomNA[i + 1]) * valuegamas[i];
    poropressao[i + 1] = 0;
  }
  tensaoefetiva=tensaototal;
  cotasfinais=[];
  cotasfinais=cotassemNA;
   grafico();
}

