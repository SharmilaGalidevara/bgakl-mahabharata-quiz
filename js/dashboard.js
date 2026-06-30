const data = getLeaderboard();

const stats = document.getElementById("stats");

if (data.length === 0) {
    stats.innerHTML = "<p>No data yet</p>";
} else {

    const total = data.length;

    const best = data.reduce((a,b) => a.score > b.score ? a : b);

    const fastest = data.reduce((a,b) => a.time < b.time ? a : b);

    const avgScore =
        (data.reduce((sum, d) => sum + d.score, 0) / total).toFixed(2);

    stats.innerHTML = `
        <p>Attempts: ${total}</p>
        <p>Best Score: ${best.score}</p>
        <p>Fastest Time: ${fastest.time}s</p>
        <p>Average Score: ${avgScore}</p>
    `;
}
