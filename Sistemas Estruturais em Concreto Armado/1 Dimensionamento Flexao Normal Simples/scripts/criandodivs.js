
//Criar as divs com a deformação do aço e concreto
var ctncanvas = document.getElementById('ctncanvas');
criardiv = document.createElement('div');
criardiv2 = document.createElement('div');
criardiv3=document.createElement('div');

ctncanvas.classList.add("ctn2");
criardiv.id='divcriada1';
criardiv2.id="divcriada2";
criardiv2.classList.add("bold")
criardiv3.id="divcriada3"

ctncanvas.appendChild(criardiv);
criardiv.appendChild(criardiv2);
criardiv.appendChild(criardiv3);

//

criardiv4 = document.createElement('div');
criardiv5 = document.createElement('div');
criardiv6 = document.createElement('div');

criardiv4.id='divcriada4';
criardiv5.id="divcriada5";
criardiv5.classList.add("bold")
criardiv6.id="divcriada6"

ctncanvas.appendChild(criardiv4);
criardiv4.appendChild(criardiv5);
criardiv4.appendChild(criardiv6);

