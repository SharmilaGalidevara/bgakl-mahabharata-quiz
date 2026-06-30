// Player Name
const playerName =
localStorage.getItem("playerName");

document.getElementById("playerName").innerText =
playerName;

// Current Question
let currentQuestion = 0;

// Store Answers
let selectedAnswers = [];

// Load First Question
loadQuestion();

// =========================

function loadQuestion(){

const q =
questions[currentQuestion];

document.getElementById("questionNumber").innerText =
currentQuestion+1;

document.getElementById("questionEnglish").innerText =
q.questionEnglish;

document.getElementById("questionTamil").innerText =
q.questionTamil;

const container =
document.getElementById("optionsContainer");

container.innerHTML="";

q.options.forEach((option,index)=>{

const div=document.createElement("div");

div.className="option";

div.innerHTML=`

<strong>

${String.fromCharCode(65+index)}

</strong>

${option.english}

<br><br>

${option.tamil}

`;

div.onclick=()=>{

selectAnswer(index);

};

container.appendChild(div);

});

}

// =========================

function selectAnswer(index){

selectedAnswers[currentQuestion]=index;

const options=
document.querySelectorAll(".option");

options.forEach(option=>

option.classList.remove("selected")

);

options[index].classList.add("selected");

}

// =========================

document.getElementById("nextBtn").onclick=()=>{

if(currentQuestion<questions.length-1){

currentQuestion++;

loadQuestion();

}

};

document.getElementById("previousBtn").onclick=()=>{

if(currentQuestion>0){

currentQuestion--;

loadQuestion();

}

};
