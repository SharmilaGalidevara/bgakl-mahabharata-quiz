const STORAGE_KEY = "bgakl_leaderboard";

function saveResult(result) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    data.push(result);
    data.sort((a, b) => {
        if (b.score === a.score) {
            return a.timeTaken - b.timeTaken;
        }
        return b.score - a.score;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLeaderboard() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function getBestScore() {
    const data = getLeaderboard();
    if (data.length === 0) return null;
    return data.reduce((best, curr) => {
        if (curr.score !== best.score) {
            return curr.score > best.score ? curr : best;
        }
        return curr.timeTaken < best.timeTaken ? curr : best;
    });
}

function formatTime(totalSeconds) {
    const safeSeconds = Math.max(0, totalSeconds);
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
    const seconds = String(safeSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}
