const list = document.getElementById("leaderboardList");

if (list) {
    let data = getLeaderboard();

    data.sort((a, b) => {
        if (b.score === a.score) {
            return a.timeTaken - b.timeTaken;
        }
        return b.score - a.score;
    });

    if (data.length === 0) {
        list.innerHTML = "<p class='empty'>No attempts yet. Start your first practice round.</p>";
    } else {
        data.slice(0, 10).forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "leaderboard-item";
            div.innerHTML = `
                <div>
                    <h3>${index + 1}. ${item.name}</h3>
                    <p>${item.score} / 40 correct</p>
                </div>
                <div class="leaderboard-meta">
                    <span>⏱ ${formatTime(item.timeTaken)}</span>
                    <span>🎯 ${item.accuracy}%</span>
                </div>
            `;
            list.appendChild(div);
        });
    }
}
