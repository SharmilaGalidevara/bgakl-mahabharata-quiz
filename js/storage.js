// =========================
// STORAGE MANAGER
// =========================

const STORAGE_KEY = "bgakl_quiz_history";

// Save result
function saveResult(result) {

    let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    history.push(result);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

}

// Get leaderboard
function getLeaderboard() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}

// Clear (optional)
function clearHistory() {

    localStorage.removeItem(STORAGE_KEY);

}
