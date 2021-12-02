let mostrartabela = document
  .getElementById("btn-camadas")
  .addEventListener("click", mostrar);

function mostrar() {
  if(!!document.getElementById('tabela1')){
    document.getElementById('tabela1').remove();
    document.getElementById('btndesenhar').remove();
  }
  
  let ctntabela = document.getElementById("tesquerda");
  let numcamadas = Number(document.getElementById("cam").value);

  let criartabela = document.createElement("table");
  criartabela.id="tabela1"
  ctntabela.appendChild(criartabela);

  let criarthead = document.createElement("thead");
  criarthead.id="theadtabela1";
  criartabela.appendChild(criarthead);

  linha = criarthead.insertRow(0);

  txthead1 = linha.insertCell(0);
  txthead2 = linha.insertCell(1);
  txthead3 = linha.insertCell(2);

  txthead1.textContent = "Camada";
  txthead2.textContent = "Cota Superior (m)";
  txthead3.textContent = "Gama do Solo (kN/m³)";

  criarlinha = document.createElement('tr');
  criartabela.appendChild(criarlinha);

  for (i = 0; i < numcamadas; i++) {
    let linha = criartabela.insertRow(-1);
    let c1 = linha.insertCell(0);
    let c2 = linha.insertCell(1);
    let c3 = linha.insertCell(2);

    c1.textContent =  + (i + 1);

    criarinputcota = document.createElement("input");
    criarinputcota.type = "number";
    criarinputcota.id = "inputcota" + (i + 1);
    criarinputcota.classList.add("inputcota");
    c2.appendChild(criarinputcota);

    criarinputgama = document.createElement("input");
    criarinputgama.type = "number";
    criarinputcota.id = "inputgama" + (i + 1);
    criarinputgama.classList.add("inputgama");
    c3.appendChild(criarinputgama);
  }

  
  linhafinal = criartabela.insertRow(-1);
  colunalinhafinal = linhafinal.insertCell(0);
  colunalinhafinal.textContent="Nível Inferior";


  colunalinhafinal = linhafinal.insertCell(1);
  criarinputlinhafinal = document.createElement('input');
  criarinputlinhafinal.type="number";
  criarinputlinhafinal.id="inputlinhafinal";
  criarinputlinhafinal.classList.add("inputcota");
  colunalinhafinal.appendChild(criarinputlinhafinal);

  linhaNA = criartabela.insertRow(-1);
  colunaNA1 = linhaNA.insertCell(0);
  colunaNA1.textContent="Nível d'água";

  colunaNA2 = linhaNA.insertCell(1);
  criarinputNA = document.createElement('input');
  criarinputNA.type="number";
  criarinputNA.id="inputNA";
  colunaNA2.appendChild(criarinputNA);

  
  inputdesenhar = document.createElement("div");
  inputdesenhar.classList.add('btn-desenhar')
  inputdesenhar.id="btndesenhar"
  inputdesenhar.textContent = "Desenhar"
  ctntabela.appendChild(inputdesenhar)
  
  inputdesenhar.addEventListener('click',desenhar);
  clique=0;
}



