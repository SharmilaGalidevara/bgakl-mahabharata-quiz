let allQuestions = [];
let quizQuestions = [];
let currentQuestion = 0;
let selectedAnswers = [];

const TOTAL_QUESTIONS = 40;
const QUIZ_TIME = 3600;

let timer = QUIZ_TIME;
let timerInterval;

// =========================

window.onload = async () => {

    document.getElementById("playerName").innerText =
        localStorage.getItem("playerName");

    await loadQuestions();

    startTimer();

};

// =========================

async function loadQuestions() {

    const response = await fetch("data/questions.json");

    allQuestions = await response.json();

    quizQuestions =
        getRandomQuestions(allQuestions, Math.min(TOTAL_QUESTIONS, allQuestions.length));

    selectedAnswers =
        new Array(quizQuestions.length).fill(null);

    createPalette();

    loadQuestion();

}

// =========================

function loadQuestion() {

    const q = quizQuestions[currentQuestion];

    document.getElementById("questionCounter").innerText =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    document.getElementById("questionEnglish").innerText =
        q.questionEnglish;

    document.getElementById("questionTamil").innerText =
        q.questionTamil;

    const container =
        document.getElementById("optionsContainer");

    container.innerHTML = "";

    q.options.forEach((option, index) => {

        const div = document.createElement("div");

        div.className = "option";

        if (selectedAnswers[currentQuestion] === index) {

            div.classList.add("selected");

        }

        div.innerHTML = `

        <strong>${String.fromCharCode(65 + index)}</strong>

        ${option.english}

        <br><br>

        ${option.tamil}

        `;

        div.onclick = () => {

            selectedAnswers[currentQuestion] = index;

            updatePalette();

            loadQuestion();

        };

        container.appendChild(div);

    });

    updateProgress();

}
