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

// =========================

document.getElementById("nextBtn").onclick = () => {

    if (currentQuestion < quizQuestions.length - 1) {

        currentQuestion++;

        loadQuestion();

    }

};

document.getElementById("previousBtn").onclick = () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

};

// =========================

function createPalette() {

    const palette =
        document.getElementById("questionPalette");

    palette.innerHTML = "";

    quizQuestions.forEach((q, index) => {

        const box =
            document.createElement("button");

        box.innerText = index + 1;

        box.className = "paletteBtn";

        box.onclick = () => {

            currentQuestion = index;

            loadQuestion();

        };

        palette.appendChild(box);

    });

    updatePalette();

}

// =========================

function updatePalette() {

    const buttons =
        document.querySelectorAll(".paletteBtn");

    buttons.forEach((button, index) => {

        button.classList.remove("answered");

        if (selectedAnswers[index] != null) {

            button.classList.add("answered");

        }

    });

}

// =========================

function updateProgress() {

    const answered =
        selectedAnswers.filter(x => x != null).length;

    const percentage =
        answered / quizQuestions.length * 100;

    document.getElementById("progressFill").style.width =
        percentage + "%";

}

// =========================

function startTimer() {

    timerInterval = setInterval(() => {

        timer--;

        document.getElementById("timer").innerText =
            formatTime(timer);

        if (timer <= 0) {

            clearInterval(timerInterval);

            submitQuiz();

        }

    }, 1000);

}

// =========================

document.getElementById("submitBtn").onclick = () => {

    submitQuiz();

};

function submitQuiz() {

    clearInterval(timerInterval);

    let score = 0;

    quizQuestions.forEach((question, index) => {

        const correct =
            question.options.findIndex(option => option.correct);

        if (selectedAnswers[index] === correct) {

            score++;

        }

    });

    localStorage.setItem("score", score);

    localStorage.setItem("timeTaken", QUIZ_TIME - timer);

    window.location.href = "result.html";

    const resultData = {
    name: localStorage.getItem("playerName"),
    score: score,
    timeTaken: QUIZ_TIME - timer,
    date: new Date().toISOString()
};

saveResult(resultData);

}
