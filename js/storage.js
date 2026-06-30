const STORAGE_KEY = "bgakl_leaderboard";

function saveResult(result) {

    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    data.push(result);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

}

function getLeaderboard() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}

// 🆕 extra helper (future dashboard)
function getBestScore() {

    const data = getLeaderboard();

    if (data.length === 0) return null;

    return data.reduce((best, curr) =>
        curr.score > best.score ? curr : best
    );

}
