const name = localStorage.getItem("playerName");
const score = localStorage.getItem("score");
const time = localStorage.getItem("timeTaken");

document.getElementById("resultName").innerText = name;

document.querySelector(".score").innerHTML = `
    ${score} / 40
    <br><br>
    ⏱ Time: ${time}s
`;

if (parseInt(score) === 40) {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });
}
