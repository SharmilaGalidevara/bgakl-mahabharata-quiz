const name = localStorage.getItem("playerName");
const score = localStorage.getItem("score");
const time = localStorage.getItem("timeTaken");

document.getElementById("resultName").innerText = name;
document.querySelector(".score").innerText = `${score} / 40`;
