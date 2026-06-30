// ================================
// BGAKL Mahabharata Quiz
// Home Page
// ================================

const startBtn = document.getElementById("startBtn");
const playerNameInput = document.getElementById("playerName");

if (startBtn && playerNameInput) {
    window.addEventListener("load", () => {
        playerNameInput.focus();
    });

    startBtn.addEventListener("click", startQuiz);

    playerNameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            startQuiz();
        }
    });
}

function startQuiz() {
    const playerName = playerNameInput.value.trim();

    if (!playerName) {
        alert("Please enter your name before starting the quiz.");
        playerNameInput.focus();
        return;
    }

    localStorage.setItem("playerName", playerName);
    localStorage.removeItem("activeQuiz");
    localStorage.removeItem("activeQuizProgress");
    localStorage.removeItem("latestResult");

    window.location.href = "quiz.html";
}
