// ==============================
// Utility Functions
// ==============================

// Shuffle an array
function shuffleArray(array) {

    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];

    }

    return newArray;

}



// Format timer

function formatTime(seconds) {

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

}



// Save to local storage

function saveData(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}



// Read local storage

function loadData(key) {

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;

}



// Pick random questions

function getRandomQuestions(allQuestions, count) {

    return shuffleArray(allQuestions).slice(0, count);

}
