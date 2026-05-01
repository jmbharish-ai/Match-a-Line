var perfectColors=[
    color("1", "B", "1", "R", "1"),
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
        if(greaterEqual(YBV, RGV)) G=L.mul(("1").sub(RGV.div("2"))); else G=L.mul(("1").sub(RGV.add(YBV.div("2"))));
        B=L.mul(("1").sub(max(RGV, YBV)));
    }else if(YB=="Y"&&RG==""){
        R=L;
        G=L;
        B=L.mul(("1").sub(YBV));
    }else if(YB=="Y"&&RG=="G"){
        if(greaterEqual(YBV, RGV)) R=L.mul(("1").sub(RGV.div("2"))); else R=L.mul((("1").sub(RGV)).add(YBV.div("2")));
        G=L;
        B=L.mul(("1").sub(max(RGV, YBV)));
    }else if(YB==""&&RG=="R"){
        R=L;
        G=L.mul(("1").sub(RGV));
        B=L.mul(("1").sub(RGV));
    }else if(YB==""&&RG==""){
        R=L;
        G=L;
        B=L;
    }else if(YB==""&&RG=="G"){
        R=L.mul(("1").sub(RGV));
        G=L;
        B=L.mul(("1").sub(RGV));
    }else if(YB=="B"&&RG=="R"){
        if(greaterEqual(RGV, YBV)){R=L; B=L.mul((("1").sub(RGV)).add(YBV));}
        else{R=L.mul((("1").sub(YBV)).add(RGV));}
        G=L.mul(("1").sub(YBV.add(RGV)));
    }else if(YB=="B"&&RG==""){
        R=L.mul(("1").sub(YBV));
        G=L.mul(("1").sub(YBV));
        B=L;
    }else if(YB=="B"&&RG=="G"){
        if(greaterEqual(RGV, YBV)){G=L; B=L.mul((("1").sub(RGV)).add(YBV));}
        else{G=L.mul((("1").sub(YBV)).add(RGV)); B=L;}
        R=L.mul(("1").sub(YBV.add(RGV)));
    }
    R=(R.mul("255")).round().valueOf(); G=(G.mul("255")).round().valueOf(); B=(B.mul("255")).round().valueOf();
    return "rgb("+R+", "+G+", "+B+")";
    function max(first, next){if(greaterEqual(first, next)) return first; else return next;}
    function greaterEqual(first, next){if(first.compare(next)>=0) return true; else return false;} //greater than or equal to
}
