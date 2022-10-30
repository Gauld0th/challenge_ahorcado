let words = ["carne","cartillo", "lavadora","sucio","cangrejo","lento","alimentos","delgado","cubo","comida","caracol","abajo","alumno","bonito","cesta","sol","beber","botella","hamburguesa","invierno"];
console.log(words)

const wordContainer = document.querySelector(".secretWord");
const startButton = document.querySelector(".startButton");
const usedLettersElement = document.querySelector(".usedLetters");
const newGame = document.querySelector(".newGame");
const firstPage = document.querySelector(".firstPage");
const gamePage = document.querySelector(".gamePage");
const ganaste = document.getElementById("ganaste");
const perdiste = document.getElementById("perdiste");
const giveUp = document.querySelector(".giveUp");
const cancel = document.getElementById("cancel");
const saveAndStart = document.getElementById("saveAndStart");
const insertWord = document.getElementById("insertWord");
const addCustomWord = document.querySelector(".addCustomWord");
const insertWords = document.querySelector(".insertWords");

let canvas = document.getElementById("canvas");
let draw = canvas.getContext("2d");
draw.canvas.width = 0;
draw.canvas.height = 0;

const bodyParts = [
    [12, 8, 1, 1], 
    [12, 9, 1, 3], 
    [11, 9, 1, 1], 
    [13, 9, 1, 1], 
    [11, 12, 1, 1],
    [13, 12, 1, 1] 
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

function addWordPage(){
    firstPage.style.display = "none";
    insertWords.style.display = "block";
}

function cancelPage() {
    insertWords.style.display = "none";
    firstPage.style.display = "block";
}
function validateEvent(){
    
    if (!words.includes(insertWords.value)){
        addWordToList();
    }else {
        startGame();
    }
}
function addWordToList(){   
   words.push(insertWord.value);
   startGame();
}

function addLetter(letter) {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

function addBodyPart(bodyPart){
    draw.fillStyle = "#fff";
    draw.fillRect(...bodyPart);
};


function wrongLetter() {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGameLose();
}

function endGameWin() {
    document.removeEventListener("keydown", letterEvent);
    ganaste.style.display = "block"
}
function endGameLose() {
    document.removeEventListener("keydown", letterEvent);
    perdiste.style.display = "block"
}

function correctLetter(letter) {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle("hidden");
            hits++;
        }
    }
    if(hits === selectedWord.length) endGameWin();
}

function letterInput(letter) {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

function letterEvent(event) {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

function drawWord() {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement("span");
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add("letter");
        letterElement.classList.add("hidden");
        wordContainer.appendChild(letterElement);
    });
}
function selectRandomWord() {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split("");
    console.log(word);
}



function drawHangMan(){
    draw.canvas.width = 400;
    draw.canvas.height = 400;   
    draw.scale(20,20);
    draw.clearRect(0,0,canvas.width,canvas.height);
    draw.fillStyle = "#d95d39";
    draw.fillRect(5, 15,10, 1);
    draw.fillRect(8, 7, 1, 8);
    draw.fillRect(8, 6, 5, 1);
    draw.fillRect(12, 6, 1, 2);  
}

function desistGame() {
    document.removeEventListener("keydown", letterEvent);
}

function startGame(){
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = "";
    usedLettersElement.innerHTML = "";
    firstPage.style.display = "none";
    insertWords.style.display = "none";
    gamePage.style.display = "block";
    drawHangMan();
    selectRandomWord();
    drawWord();
    ganaste.style.display = "none"
    perdiste.style.display = "none"
    document.addEventListener("keydown", letterEvent);
}

addCustomWord.addEventListener("click", addWordPage);
cancel.addEventListener("click", cancelPage);
saveAndStart.addEventListener("click", validateEvent);
giveUp.addEventListener("click", desistGame);
newGame.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);