
var firstNumber = "0"
var firstPx = "px"
var probel = " "
var secondNumber = "0"
var secondPx = "px"



setInterval(star, 1000); 



function star(){
firstNumber++;
secondNumber++;
posic=firstNumber+''+firstPx+''+probel+''+secondNumber+''+secondPx;
document.getElementById("str").style.backgroundPosition=posic;

};

