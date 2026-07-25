const result = JSON.parse(localStorage.getItem("latestResult")) || {
    name: localStorage.getItem("playerName") || "Player",
    score: Number(localStorage.getItem("score") || 0),
    timeTaken: Number(localStorage.getItem("timeTaken") || 0),
    accuracy: 0
};

const nameEl = document.getElementById("resultName");
const scoreEl = document.getElementById("scoreDisplay");
const timeEl = document.getElementById("timeDisplay");
const accuracyEl = document.getElementById("accuracyDisplay");
const summaryEl = document.getElementById("resultSummary");
const shareBtn = document.getElementById("shareBtn");
const messageEl = document.getElementById("message");

if (nameEl) nameEl.innerText = result.name;
if (scoreEl) scoreEl.innerText = `${result.score} / 40`;
if (timeEl) timeEl.innerText = `${formatTime(result.timeTaken)}`;
if (accuracyEl) accuracyEl.innerText = `${result.accuracy}%`;

if (summaryEl) {
    if (result.score === 40) {
        summaryEl.innerText = "Perfect practice round! Your speed and accuracy were excellent.";
    } else if (result.score >= 30) {
        summaryEl.innerText = "Strong work! You are getting closer to a top-level finish.";
    } else {
        summaryEl.innerText = "Keep practising and try another fast round to climb the leaderboard.";
    }
}

if (result.score === 40) {
    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
    });
}

if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
        const text = `${result.name} scored ${result.score}/40 in ${formatTime(result.timeTaken)} on the BGAKL Mahabharata Quiz practice round.`;

        try {
            if (navigator.share) {
                await navigator.share({ title: "BGAKL Quiz Result", text });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                if (messageEl) {
                    messageEl.innerText = "Result copied to clipboard.";
                }
            }
        } catch (error) {
            if (messageEl) {
                messageEl.innerText = "Sharing was cancelled.";
            }
        }
    });
}

function formatTime(totalSeconds) {
    const safeSeconds = Math.max(0, totalSeconds);
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
    const seconds = String(safeSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}

const wrongAnswers =
    JSON.parse(localStorage.getItem("wrongAnswers")) || [];

const container = document.getElementById("wrongAnswersContainer");

if (wrongAnswers.length === 0) {
    container.innerHTML =
        "<p class='perfect'>🎉 Amazing! You answered every question correctly.</p>";
} else {

    wrongAnswers.forEach(item => {

        const card = document.createElement("div");
        card.className = "review-card";

        let optionsHTML = "";

        item.options.forEach((option, i) => {

            let icon = "";
            let className = "";

            if (i === item.correctIndex) {
                icon = "✅";
                className = "correct";
            }

            if (i === item.selectedIndex && i !== item.correctIndex) {
                icon = "❌";
                className = "wrong";
            }

            optionsHTML += `
                <div class="${className}">
                    ${icon} ${String.fromCharCode(65+i)}.
                    ${option.english}<br>
                    <small>${option.tamil}</small>
                </div>
            `;
        });

        card.innerHTML = `
            <h3>Question ${item.questionNumber}</h3>

            <p><strong>${item.questionEnglish}</strong></p>
            <p>${item.questionTamil}</p>

            ${optionsHTML}
        `;

        container.appendChild(card);

    });

}
