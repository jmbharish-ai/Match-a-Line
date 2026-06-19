var perfectColors=[
    color("1", "B", "1", "R", "1"),
    color("1", "B", "1", "G", "1"),
    color("1", "", "0", "", "0"),
    color("1", "", "0", "R", "1"),
    color("0", "", "0", "", "0"),
    color("1", "B", "1", "", "0"),
    color("1/2", "Y", "1", "R", "1"),
    color("1/2", "", "0", "", "0"),
    color("1", "Y", "1", "R", "1"),
    color("1", "Y", "1", "", "0"),
    color("1", "B", "1", "R", "1/2"),
    color("1", "", "0", "G", "1")
];
function randomPerfectColor(){
    return perfectColors[Math.floor(Math.random()*perfectColors.length)];
}
var lines=["row","column"];
var line="row";
var lineNumber=1;
var turns;

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
        R=Fraction("1");
        if(greaterEqual(YBV, RGV)) G=(Fraction("1")).sub(RGV.div(Fraction("2"))); else G=((Fraction("1")).sub(RGV)).add(YBV.div(Fraction("2")));
        B=(Fraction("1")).sub(max());
    }else if(YB=="Y"&&RG==""){
        R=Fraction("1");
        G=Fraction("1");
        B=(Fraction("1")).sub(YBV);
    }else if(YB=="Y"&&RG=="G"){
        if(greaterEqual(YBV, RGV)) R=(Fraction("1")).sub(RGV.div(Fraction("2"))); else R=((Fraction("1")).sub(RGV)).add(YBV.div(Fraction("2")));
        G=Fraction("1");
        B=(Fraction("1")).sub(max());
    }else if(YB==""&&RG=="R"){
        R=Fraction("1");
        G=(Fraction("1")).sub(RGV);
        B=(Fraction("1")).sub(RGV);
    }else if(YB==""&&RG==""){
        R=Fraction("1");
        G=Fraction("1");
        B=Fraction("1");
    }else if(YB==""&&RG=="G"){
        R=(Fraction("1")).sub(RGV);
        G=Fraction("1");
        B=(Fraction("1")).sub(RGV);
    }else if(YB=="B"&&RG=="R"){
        if(greaterEqual(RGV, YBV)){R=Fraction("1"); B=((Fraction("1")).sub(RGV)).add(YBV);}
        else{R=((Fraction("1")).sub(YBV)).add(RGV); B=Fraction("1");}
        G=(Fraction("1")).sub(max());
    }else if(YB=="B"&&RG==""){
        R=(Fraction("1")).sub(YBV);
        G=(Fraction("1")).sub(YBV);
        B=Fraction("1");
    }else if(YB=="B"&&RG=="G"){
        if(greaterEqual(RGV, YBV)){G=Fraction("1"); B=((Fraction("1")).sub(RGV)).add(YBV);}
        else{G=((Fraction("1")).sub(YBV)).add(RGV); B=Fraction("1");}
        R=(Fraction("1")).sub(max());
    }
    R=L.mul(R); G=L.mul(G); B=L.mul(B);

    R=(R.mul(Fraction("255"))).round().valueOf(); G=(G.mul(Fraction("255"))).round().valueOf(); B=(B.mul(Fraction("255"))).round().valueOf();
    return "rgb("+R+", "+G+", "+B+")";
    function max(){if(greaterEqual(YBV, RGV)) return YBV; else return RGV;}
    function greaterEqual(first, next){if(first.compare(next)>=0) return true; else return false;} //greater than or equal to
}