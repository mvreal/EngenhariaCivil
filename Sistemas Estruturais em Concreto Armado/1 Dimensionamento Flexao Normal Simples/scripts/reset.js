function reset(){
    
    if(typeof dominio !== "undefined"){ //Essa variável só é definida no final do processo, de modo que haverá o reset quando o operador apertar o calcular da segunda vez em diante
        console.log("entrou")
        
        ctx1.clearRect(-300, -300, 600, 600);
        ctx2.clearRect(-300, -300, 600, 600);
        ctx3.clearRect(-300, -300, 600, 600);

    }
}