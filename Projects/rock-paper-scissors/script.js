let img_stone = document.getElementById("rock")
let img_paper = document.getElementById("paper")
let img_scissors = document.getElementById("scissors")


img_stone.addEventListener("click", choseRock);
img_paper.addEventListener("click", chosePaper);
img_scissors.addEventListener("click",choseScissors)

let userChoice= "";

function choseRock(){
    console.log("You chose rock!");
    userChoice ="Rock!";


    checkResult();
}

function chosePaper(){
    console.log("You chose rock!");
    userChoice="Paper!";

    checkResult();
}

function choseScissors(){
    console.log("You chose scissors!")
    userChoice="scissors!";

    checkResult();

}


function checkResult(){
    let choiceComputer=Math.floor(Math.random()*3);
    let arrayChoice = ["rock","paper","scissors"]
    choiceComputer = arrayChoice[choiceComputer];
    console.log ("Computer chose" + choiceComputer);
}

let result ="";

if (userChoice == choiceComputer)
    console.log("Draw");
    result = "Draw";

    else if (userChoice == choiceComputer)
