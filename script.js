
const road = document.getElementById("road");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

let playerX = 122;
let enemies = [];
let score = 0;
let running = false;
let gameLoop;
let spawnLoop;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !running) {
        startGame();
    }

    if (!running) return;

    if (event.key === "ArrowLeft") {
        playerX -= 20;
    }

    if (event.key === "ArrowRight") {
        playerX += 20;
    }

    playerX = Math.max(0, Math.min(244, playerX));
    player.style.left = playerX + "px";
});

function startGame() {
    clearInterval(gameLoop);
    clearInterval(spawnLoop);

    enemies.forEach(enemy => enemy.element.remove());
    enemies = [];

    playerX = 122;
    score = 0;
    running = true;

    player.style.left = playerX + "px";
    scoreDisplay.textContent = score;
    message.textContent = "Avoid the red cars!";
    startBtn.textContent = "Restart Game";

    spawnEnemy();

    spawnLoop = setInterval(spawnEnemy, 1000);
    gameLoop = setInterval(updateGame, 20);
}

function spawnEnemy() {
    if (!running) return;

    const enemy = document.createElement("div");
    enemy.classList.add("enemy");

    const lanes = [28, 128, 228];
    const x = lanes[Math.floor(Math.random() * lanes.length)];

    enemy.style.left = x + "px";
    enemy.style.top = "-70px";
    road.appendChild(enemy);

    enemies.push({ element: enemy, x: x, y: -70 });
}

function updateGame() {
    enemies.forEach(enemy => {
        enemy.y += 5;
        enemy.element.style.top = enemy.y + "px";

        const playerY = 415;

        const collision =
            enemy.x < playerX + 40 &&
            enemy.x + 40 > playerX &&
            enemy.y < playerY + 65 &&
            enemy.y + 65 > playerY;

        if (collision) {
            endGame();
        }

        if (enemy.y > 500) {
            enemy.element.remove();
            enemies = enemies.filter(item => item !== enemy);
            score++;
            scoreDisplay.textContent = score;
        }
    });
}

function endGame() {
    running = false;
    clearInterval(gameLoop);
    clearInterval(spawnLoop);

    message.textContent = "Game Over! Final score: " + score;
    startBtn.textContent = "Play Again";
}

startBtn.addEventListener("click", startGame);
