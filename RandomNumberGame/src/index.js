const guess = document.querySelector(".guessField"),
guessSubmit = document.querySelector(".guessSubmit"),
selResult = document.querySelector(".selResult"),
gameResult = document.querySelector(".gameResult"),
select = document.querySelector(".guess-form");

let IMG_NUMBER = 150;

let slide = document.getElementById("slider");
const bloc = document.querySelector("h3"); 

slide.onchange = function() {
    bloc.innerHTML = this.value;
    IMG_NUMBER = this.value; 
}

function guessGame() {
    const selected = guess.value;
    let usrNum = Number(selected);
    let randNum = Math.floor(Math.random() * IMG_NUMBER);
    
    selResult.innerHTML = 
        "You chose: " + usrNum + ", the machine chose: " + randNum + ".\n";
    if (usrNum === randNum) {
        gameResult.textContent = "You win!";
    } else {
        gameResult.textContent = "You lost!";
    } 
}

function rangeNum(event) {
    bloc.innerHTML = `Generate a number between 0 and ${IMG_NUMBER}`;
}

function handleChange() {
    guessSubmit.addEventListener("click", guessGame);
}

function init() {
    bloc.innerText = `Generate a number between 0 and ${IMG_NUMBER}`;
    slide.addEventListener("click", rangeNum);
    select.addEventListener("click", handleChange);
}

init();
