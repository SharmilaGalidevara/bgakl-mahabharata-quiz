const name = localStorage.getItem("playerName");
const score = localStorage.getItem("score");
const time = localStorage.getItem("timeTaken");

document.getElementById("resultName").innerText = name;
document.querySelector(".score").innerText = `${score} / 40`;

// Save leaderboard entry
const entry = {
    name,
    score: parseInt(score),
    time: parseInt(time),
    date: new Date().toISOString()
};

let history = JSON.parse(localStorage.getItem("bgakl_leaderboard")) || [];
history.push(entry);
localStorage.setItem("bgakl_leaderboard", JSON.stringify(history));
