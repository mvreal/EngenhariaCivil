
function desenhoinicial(){

    desenho1 = document.getElementById("desenho1");
    desenho2 = document.getElementById("desenho2");
    desenho3 = document.getElementById("desenho3");
    
    ctx1 = desenho1.getContext("2d");
    ctx2 = desenho2.getContext("2d");
    ctx3 = desenho3.getContext("2d");
    
    ctx1.translate(150,0);
    ctx2.translate(150,0);
    ctx3.translate(150,0);
    
    ctx1.beginPath();
    ctx1.setLineDash([]);
    ctx1.strokeStyle = 'black'
    ctx1.lineWidth="2";
    ctx1.moveTo(50,80);
    ctx1.lineTo(50,310);
    ctx1.lineTo(-50,310);
    ctx1.lineTo(-50,80);
    ctx1.lineTo(50,80);
    ctx1.stroke()
    
    //14 pixels para cada 1/1000
    ctx2.beginPath();
    ctx2.setLineDash([]);
    ctx2.strokeStyle = 'black'
    ctx2.lineWidth="2";
    ctx2.moveTo(-49,80);
    ctx2.lineTo(0,80);
    ctx2.lineTo(0,287);
    ctx2.lineTo(140,287);
    
    ctx2.moveTo(-49,80);
    ctx2.lineTo(-49,88);
    
    ctx2.moveTo(-28,80);
    ctx2.lineTo(-28,88);
    
    ctx2.moveTo(140,287);
    ctx2.lineTo(140,279);
    
    ctx2.moveTo(29,287);
    ctx2.lineTo(29,279);
    
    ctx2.stroke()
    
    ctx3.beginPath();
    ctx3.setLineDash([]);
    ctx3.strokeStyle = 'black'
    ctx3.lineWidth="2";
    ctx3.moveTo(-120,80);
    ctx3.lineTo(-20,80);
    ctx3.lineTo(-20,310);
    ctx3.lineTo(-120,310);
    ctx3.stroke()
    
    
    
    ctx2.font="bold 12px Montserrat";
    ctx2.fillText('3.50',-60,70)
    ctx2.fillText('2.00',-25,70)
    
    ctx2.fillText('10',130,270)
    ctx2.fillText('2.07',20,270)
    
    ctx3.beginPath();
    ctx3.arc(45,200,40,1.5*Math.PI,2.5*Math.PI);
    ctx3.stroke();
    
    ctx3.beginPath();
    ctx3.setLineDash([]);
    ctx3.moveTo(45,148);
    ctx3.lineTo(45,170);
    ctx3.lineTo(25,159);
    ctx3.lineTo(45,148)
    ctx3.stroke();
    }



    desenhoinicial();