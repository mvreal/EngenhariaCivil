function desenhar() {
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
  let cotaminimasemNA = Math.min(...cotassemNA);

  if(valueNA>=cotamaximasemNA){
      NAmaior();
  }else if(valueNA<cotamaximasemNA && valueNA>cotaminimasemNA){
      NAmedio();
  }else{
      NAmenor();
  }

}

