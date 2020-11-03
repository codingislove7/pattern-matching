// selectors
const gameColors = ["red", "blue", "green", "yellow"];
const message = document.querySelector(".message");
const gameArea = document.querySelector(".gameArea");
const button = document.querySelector("#start");
// global variables
// random clicks
let gameClicks = [];
// user clicks
let userClicks = [];
// is play on  
let inPlay = false;
// the level
let playNum = 2;
// load game and start the game after click start
window.addEventListener("load", setup);
button.addEventListener("click", function () {
    if (!inPlay) {
        player();
    }
})
// start the game
function player() {
    button.disabled = true;
    button.style.display = "none";
    messager("Match Pattern");
    gameClicks = [];
    userClicks = [];
    runSequence(playNum);
}
// randomly click 
function runSequence(num) {
    let squares = document.querySelectorAll(".box");
    num--;
    if (num < 0) {
        inPlay = true;
        return;
    }
    let randomNum = Math.floor(Math.random() * gameColors.length);
    console.log(squares[randomNum]);
    gameClicks.push(gameColors[randomNum]);
    console.log(gameClicks);
    squares[randomNum].style.opacity = "1";
    setTimeout(function () {
        squares[randomNum].style.opacity = "0.5";
        setTimeout(function () {
            runSequence(num);
        }, 100);
    }, 500);
}
// build game boards
function setup() {
    console.log("Page loaded");
    for (let x = 0; x < gameColors.length; x++) {
        let div = eleFactory("div");
        div.style.backgroundColor = gameColors[x];
        div.classList.add("box");
        div.style.opacity = "0.5";
        div.myColor = gameColors[x];
        div.addEventListener("click", checkAnswer);
        gameArea.appendChild(div);
    }
}

// check answers
function checkAnswer(e) {
    if (inPlay) {
        let el = e.target;
        userClicks.push(el.myColor);
        el.style.opacity = "1";
        setTimeout(function () {
            el.style.opacity = "0.5";
        }, 500);
        if (userClicks.length == gameClicks.length) {
            inPlay = false;
            endGame();
        }
    }
}

function messager(mes) {
    message.innerHTML = mes;
}
// end the game
function endGame() {
    console.log("game over");
    button.disabled = false;
    button.style.display = "block";
    if (userClicks.toString() == gameClicks.toString()) {
        playNum++;
        messager("correct New Level = " + playNum);
    }
    else {
        messager("not correct");
    }
}
// create elements
function eleFactory(elType) {
    let ele = document.createElement(elType);
    return ele;
}