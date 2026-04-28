var perfectColors=[
    "rgb(255, 0, 255)",
    "rgb(0, 255, 255)",
    "rgb(255, 255, 255)",
    "rgb(255, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 255)",
    "rgb(128, 64, 0)",
    "rgb(128, 128, 128)",
    "rgb(255, 128, 0)",
    "rgb(255, 255, 0)",
    "rgb(128, 0, 255)",
    "rgb(0, 255, 0)"
];
function randomPerfectColor(){
    return perfectColors[Math.floor(Math.random()*perfectColors.length)];
}
var lines=["row","column"];
var line="row";
var lineNumber=1;
var turns;

function play(theStage){
    localStorage.setItem("stage", theStage);
    location.href="game.html";
}
function start(){
    document.getElementById("stage").style.backgroundColor=localStorage.getItem("stage");
    turns=25;
    document.getElementById("turns").innerHTML="Turns: "+turns;
    for(var row=1; row<=5; row++)
        for(var column=1; column<=5; column++)
            document.getElementById(row+"-"+column).style.backgroundColor=randomPerfectColor();
    nextColor();
}
function nextColor(){
    document.getElementById("color").style.backgroundColor=randomPerfectColor();
    document.getElementById(line+lineNumber).style.backgroundImage="";
    document.getElementById(line+lineNumber+"opposite").style.backgroundImage="";
    line=lines[Math.floor(Math.random()*lines.length)];
    lineNumber=Math.floor(Math.random()*5)+1;
    document.getElementById(line+lineNumber).style.backgroundImage="url('line.png')";
    document.getElementById(line+lineNumber+"opposite").style.backgroundImage="url('line.png')";
    check();
}

//onclick function of the squares
function replaceColor(row, column){
    if((line=="row"&&row==lineNumber)||(line=="column"&&column==lineNumber)){
        document.getElementById(row+"-"+column).style.backgroundColor=document.getElementById("color").style.backgroundColor;
        turns--;
        nextColor();
        document.getElementById("turns").innerHTML="Turns: "+turns;
    }
}

//Checking whether the player completed the game or that the game is over
function check(){
    if(lineMatched())
        location.href="completed.html";
    else if(turns==0)
        location.href="failed.html";

    function lineMatched(){
        var matched=false;
        for(var row=1; row<=5; row++){
            for(var i=0; i<perfectColors.length; i++){ //Checking for each perfect color
                var line=true;
                for(var column=1; column<=5; column++){
                    if(document.getElementById(row+"-"+column).style.backgroundColor!=perfectColors[i])
                        line=false;
                }
                if(line)
                    matched=true;
            }
        }
        for(var column=1; column<=5; column++){
            for(var i=0; i<perfectColors.length; i++){ //Checking for each perfect color
                var line=true;
                for(var row=1; row<=5; row++){
                    if(document.getElementById(row+"-"+column).style.backgroundColor!=perfectColors[i])
                        line=false;
                }
                if(line)
                    matched=true;
            }
        }
        return matched;
    }
}

function color(L, YB, YBV, RG, RGV){
    L=Fraction(L); YBV=Fraction(YBV); RGV=Fraction(RGV);
    var R=0; var G=0; var B=0;
    if(YB=="Y"&&RG=="R"){
        R=L;
        if(YBV>=RGV){G=L.mul(("1").sub(RGV.div("2")));}
        else{G=L.mul(("1").sub(RGV.add(YBV.div("2"))));}
        B=L*(("1").sub(Math.max(RGV, YBV)));
    }else if(YB=="Y"&&RG==""){
    }else if(YB=="Y"&&RG=="G"){
    }else if(YB==""&&RG=="R"){
    }else if(YB==""&&RG==""){
    }else if(YB==""&&RG=="G"){
    }else if(YB=="B"&&RG=="R"){
    }else if(YB=="B"&&RG==""){
    }else if(YB=="B"&&RG=="G"){
    }
}