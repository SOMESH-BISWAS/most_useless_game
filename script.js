// =======================
// LOAD SAVED SCORE
// =======================
let score = localStorage.getItem("score")
    ? parseInt(localStorage.getItem("score"))
    : 0;

// =======================
// ACHIEVEMENTS CONFIG
// =======================
const achievements = [
    {
        count: 1000,
        texts: [
            "You really clicked a button 1,000 times LOL.",
            "Still unemployed?",
            "This didn’t need to happen."
        ]
    },
    {
        count: 10000,
        texts: [
            "So Unemployment that its Concerning ngl.",
            "You could have learned playing a Guiter.",
            "Your could've find a girlfriend."
        ]
    },
    {
        count: 100000,
        texts: [
            "No reward. Just respect.",
            "Even the button is tired.",
            "Your finger deserves a break."
            
        ]
    },
    {
        count: 1000000,
        texts: [
            "You are beyond help.",
            "At this point, it’s commitment."
        ]
    },
    {count: 5000000,texts:"Do you really wanna see what's at 10Mil?"},
    {count: 10000000,texts:"Congratulations! You are officially the biggest time-waster!"},
    {count: 50000000,texts:"Broo, there's still time to reconsider your life choices."},
    {count: 100000000,texts:"Email me your score to claim a prize!"}


];

let unlockedAchievements = JSON.parse(
    localStorage.getItem("achievements")
) || [];

// =======================
// DOM ELEMENTS
// =======================
const scoreDisplay = document.querySelector(".score");
const button = document.querySelector(".red-button");
const clickSound = new Audio("click.wav");

// =======================
// INITIAL RENDER
// =======================
scoreDisplay.textContent = score;

// =======================
// ACHIEVEMENT POPUP
// =======================
function showAchievement(text) {
    const popup = document.createElement("div");
    popup.className = "achievement";
    popup.textContent = text;

    document.body.appendChild(popup);

    // trigger animation
    setTimeout(() => popup.classList.add("show"), 50);

    // remove after 3s
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// =======================
// BUTTON CLICK LOGIC
// =======================
button.addEventListener("click", () => {
    // increment score
    score += 1;
    scoreDisplay.textContent = score;
    localStorage.setItem("score", score);

    // sound
    clickSound.currentTime = 0;
    clickSound.play();

    // glow effect
    button.classList.add("glow");
    setTimeout(() => button.classList.remove("glow"), 100);

    // check achievements
    achievements.forEach(a => {
    if (score === a.count && !unlockedAchievements.includes(a.count)) {

        unlockedAchievements.push(a.count);
        localStorage.setItem(
            "achievements",
            JSON.stringify(unlockedAchievements)
        );

        const randomText =
            a.texts[Math.floor(Math.random() * a.texts.length)];

        showAchievement(randomText);
    }
});

});
