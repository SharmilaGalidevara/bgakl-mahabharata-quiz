let correctCount = 0;
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

    // FIX: stable 40-question set per session
    const shuffled = shuffleArray(allQuestions);

    const savedQuiz = localStorage.getItem("activeQuiz");

    if (savedQuiz) {
        quizQuestions = JSON.parse(savedQuiz);
    } else {
        quizQuestions = shuffled.slice(0, TOTAL_QUESTIONS);
        localStorage.setItem("activeQuiz", JSON.stringify(quizQuestions));
    }

    selectedAnswers = new Array(quizQuestions.length).fill(null);

    createPalette();
    loadQuestion();
}

// =========================

function loadQuestion() {

    const q = quizQuestions[currentQuestion];

    document.getElementById("questionCounter").innerText =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    document.getElementById("questionEnglish").innerText = q.questionEnglish;
    document.getElementById("questionTamil").innerText = q.questionTamil;

    const container = document.getElementById("optionsContainer");
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

    const palette = document.getElementById("questionPalette");
    palette.innerHTML = "";

    quizQuestions.forEach((_, index) => {

        const box = document.createElement("button");
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

    const buttons = document.querySelectorAll(".paletteBtn");

    buttons.forEach((button, index) => {

        button.classList.remove("answered");

        if (selectedAnswers[index] !== null) {
            button.classList.add("answered");
        }

    });
}

// =========================

function updateProgress() {

    const answered =
        selectedAnswers.filter(x => x !== null).length;

    const percentage =
        (answered / quizQuestions.length) * 100;

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("answeredCount").innerText =
        answered;

    const accuracy =
        answered === 0 ? 100 : Math.round((correctCount / answered) * 100);

    document.getElementById("accuracy").innerText =
        accuracy + "%";
}

// =========================

function startTimer() {

    timerInterval = setInterval(() => {

        timer--;

        document.getElementById("timer").innerText =
            formatTime(timer);

        // 🔴 WARNING MODE
        if (timer <= 300) {
            document.getElementById("timer").style.color = "red";
        }

        // 🔥 LAST 60 SECONDS BLINK
        if (timer <= 60) {
            document.getElementById("timer").style.animation =
                "blink 1s infinite";
        }

        if (timer <= 0) {
            submitQuiz();
        }

    }, 1000);
}

// =========================

document.getElementById("submitBtn").onclick = submitQuiz;

function submitQuiz() {

    clearInterval(timerInterval);

    let score = 0;
    correctCount = 0;

    quizQuestions.forEach((q, index) => {

        const correctIndex =
            q.options.findIndex(o => o.correct);

        if (selectedAnswers[index] === correctIndex) {
            score++;
            correctCount++;
        }

    });

    const resultData = {
        name: localStorage.getItem("playerName"),
        score: score,
        timeTaken: QUIZ_TIME - timer,
        accuracy: Math.round((correctCount / quizQuestions.length) * 100),
        date: new Date().toISOString()
    };

    saveResult(resultData);

    localStorage.setItem("score", score);
    localStorage.setItem("timeTaken", QUIZ_TIME - timer);

    window.location.href = "result.html";
}
