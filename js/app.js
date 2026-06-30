// ================================
// BGAKL Mahabharata Quiz
// Home Page
// ================================

// Get HTML elements
const startBtn = document.getElementById("startBtn");
const playerNameInput = document.getElementById("playerName");

// Check if elements exist before adding listeners
if (startBtn && playerNameInput) {

    // Focus the name field when page loads
    window.onload = () => {
        playerNameInput.focus();
    };

    // Start button click
    startBtn.addEventListener("click", startQuiz);

    // Allow pressing Enter
    playerNameInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            startQuiz();

        }

    });

}


// ================================
// Start Quiz Function
// ================================

function startQuiz() {

    const playerName = playerNameInput.value.trim();

    if (playerName === "") {

        alert("Please enter your name before starting the quiz.");

        playerNameInput.focus();

        return;

    }

    // Save player name
    localStorage.setItem("playerName", playerName);

    // Clear previous quiz session so a new quiz gets fresh questions
    localStorage.removeItem("activeQuiz");

    // Redirect to quiz page
    window.location.href = "quiz.html";

}
