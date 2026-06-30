const list = document.getElementById("leaderboardList");

let data = getLeaderboard();

// sort by score then time
data.sort((a, b) => {
    if (b.score === a.score) {
        return a.time - b.time;
    }
    return b.score - a.score;
});

if (data.length === 0) {
    list.innerHTML = "<p>No attempts yet.</p>";
}

data.slice(0, 10).forEach((item, index) => {

    const div = document.createElement("div");

    div.style.padding = "15px";
    div.style.margin = "10px 0";
    div.style.background = "#064663";
    div.style.borderRadius = "10px";

    div.innerHTML = `
        <h3>
            ${index + 1}. ${item.name}
        </h3>

        <p>
            Score: ${item.score} / 40
        </p>

        <p>
            Time: ${item.time}s
        </p>
    `;

    list.appendChild(div);

});
