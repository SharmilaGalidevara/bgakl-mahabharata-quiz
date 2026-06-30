let correctCount = 0;
let allQuestions = [];
let quizQuestions = [];
let currentQuestion = 0;
let selectedAnswers = [];
let hasSubmitted = false;
let timer = 3600;
let timerInterval = null;

const TOTAL_QUESTIONS = 40;
const QUIZ_TIME = 3600;

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function shuffleOptions(question) {
    return {
        ...question,
        options: shuffleArray(question.options)
    };
}

function formatTime(totalSeconds) {
    const safeSeconds = Math.max(0, totalSeconds);
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
    const seconds = String(safeSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}

async function initQuiz() {
    const nameLabel = document.getElementById("playerName");
    if (nameLabel) {
        nameLabel.innerText = localStorage.getItem("playerName") || "Player";
    }

    const nextBtn = document.getElementById("nextBtn");
    const previousBtn = document.getElementById("previousBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion += 1;
                loadQuestion();
            }
        });
    }

    if (previousBtn) {
        previousBtn.addEventListener("click", () => {
            if (currentQuestion > 0) {
                currentQuestion -= 1;
                loadQuestion();
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener("click", submitQuiz);
    }

    await loadQuestions();
    startTimer();
}

async function loadQuestions() {
    if (!allQuestions.length) {
        const response = await fetch("data/questions.json");
        allQuestions = await response.json();
    }

    const savedQuiz = localStorage.getItem("activeQuiz");
    const savedProgress = localStorage.getItem("activeQuizProgress");

    if (savedQuiz) {
        quizQuestions = JSON.parse(savedQuiz);
        selectedAnswers = savedProgress ? JSON.parse(savedProgress) : new Array(quizQuestions.length).fill(null);
    } else {
        quizQuestions = shuffleArray(allQuestions)
            .slice(0, TOTAL_QUESTIONS)
            .map(shuffleOptions);
        localStorage.setItem("activeQuiz", JSON.stringify(quizQuestions));
        selectedAnswers = new Array(quizQuestions.length).fill(null);
    }

    createPalette();
    loadQuestion();
}

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    if (!q) return;

    const questionCounter = document.getElementById("questionCounter");
    const questionEnglish = document.getElementById("questionEnglish");
    const questionTamil = document.getElementById("questionTamil");
    const container = document.getElementById("optionsContainer");

    if (questionCounter) {
        questionCounter.innerText = `Question ${currentQuestion + 1} / ${quizQuestions.length}`;
    }
    if (questionEnglish) {
        questionEnglish.innerText = q.questionEnglish;
    }
    if (questionTamil) {
        questionTamil.innerText = q.questionTamil;
    }

    if (container) {
        container.innerHTML = "";

        q.options.forEach((option, index) => {
            const div = document.createElement("div");
            div.className = "option";
            div.title = "Choose this option";

            if (selectedAnswers[currentQuestion] === index) {
                div.classList.add("selected");
            }

            div.innerHTML = `
                <strong>${String.fromCharCode(65 + index)}</strong>
                ${option.english}
                <br><br>
                ${option.tamil}
            `;

            div.addEventListener("click", () => {
                selectedAnswers[currentQuestion] = index;
                localStorage.setItem("activeQuizProgress", JSON.stringify(selectedAnswers));
                updatePalette();
                loadQuestion();
            });

            container.appendChild(div);
        });
    }

    updatePalette();
    updateProgress();
}

function createPalette() {
    const palette = document.getElementById("questionPalette");
    const togglePalette = document.getElementById("togglePalette");
    const closePalette = document.getElementById("closePalette");
    const palettePanel = document.getElementById("palettePanel");
    if (!palette) return;

    palette.innerHTML = "";

    quizQuestions.forEach((_, index) => {
        const box = document.createElement("button");
        box.className = "paletteBtn";
        box.innerText = index + 1;

        if (index === currentQuestion) {
            box.classList.add("active");
        }
        if (selectedAnswers[index] !== null) {
            box.classList.add("answered");
        }

        box.addEventListener("click", () => {
            currentQuestion = index;
            loadQuestion();
        });

        palette.appendChild(box);
    });

    if (togglePalette && closePalette && palettePanel) {
        togglePalette.addEventListener("click", () => {
            palettePanel.classList.toggle("is-hidden");
        });
        closePalette.addEventListener("click", () => {
            palettePanel.classList.add("is-hidden");
        });
    }
}

function updatePalette() {
    const buttons = document.querySelectorAll(".paletteBtn");
    buttons.forEach((button, index) => {
        button.classList.remove("active", "answered");
        if (index === currentQuestion) {
            button.classList.add("active");
        }
        if (selectedAnswers[index] !== null) {
            button.classList.add("answered");
        }
    });
}

function updateProgress() {
    const answered = selectedAnswers.filter((value) => value !== null).length;
    const percentage = (answered / quizQuestions.length) * 100;

    const progressFill = document.getElementById("progressFill");
    const answeredCount = document.getElementById("answeredCount");
    const accuracy = document.getElementById("accuracy");

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    if (answeredCount) {
        answeredCount.innerText = answered;
    }
    if (accuracy) {
        accuracy.innerText = answered === 0 ? "Ready" : `${Math.round(percentage)}%`;
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timer = QUIZ_TIME;
    const timerEl = document.getElementById("timer");

    if (timerEl) {
        timerEl.style.color = "#0f172a";
        timerEl.style.animation = "none";
    }

    timerInterval = setInterval(() => {
        timer -= 1;

        if (timerEl) {
            timerEl.innerText = formatTime(timer);
            if (timer <= 300) {
                timerEl.style.color = "#dc2626";
            }
            if (timer <= 60) {
                timerEl.style.animation = "blink 1s infinite";
            }
        }

        if (timer <= 0) {
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    if (hasSubmitted) return;
    hasSubmitted = true;
    clearInterval(timerInterval);

    let score = 0;
    correctCount = 0;

    quizQuestions.forEach((q, index) => {
        const correctIndex = q.options.findIndex((option) => option.correct);
        if (selectedAnswers[index] === correctIndex) {
            score += 1;
            correctCount += 1;
        }
    });

    const timeTaken = Math.min(QUIZ_TIME, QUIZ_TIME - timer);
    const resultData = {
        name: localStorage.getItem("playerName") || "Player",
        score,
        timeTaken,
        accuracy: Math.round((correctCount / quizQuestions.length) * 100),
        date: new Date().toISOString()
    };

    saveResult(resultData);
    localStorage.setItem("latestResult", JSON.stringify(resultData));
    localStorage.setItem("score", score);
    localStorage.setItem("timeTaken", timeTaken);
    localStorage.removeItem("activeQuizProgress");

    window.location.href = "result.html";
}

window.addEventListener("DOMContentLoaded", initQuiz);
