let launched = false;
let fireworksRunning = false;
let fwCanvas, fwCtx, particles = [], fwAnimationId;

function celebrate() {
    if (launched) return;
    launched = true;

    document.body.style.background =
        "radial-gradient(circle at top, #ffffff, #ff0000, #ff8c00, #ffff00, #00ff6a, #0099ff, #8a00ff)";

    const audio = document.getElementById("launchSound");
    audio.currentTime = 0;
    audio.play();

    document.getElementById("launchedText").classList.add("show");

    createConfetti(80);
    startFireworks();
}

function resetCelebration() {
    launched = false;

    document.body.style.background = "#f1f1f1";

    document.getElementById("launchedText").classList.remove("show");

    const audio = document.getElementById("launchSound");
    audio.pause();
    audio.currentTime = 0;

    document.querySelectorAll(".confetti").forEach(el => el.remove());

    stopFireworks();
}

// CONFETTI
function createConfetti(count) {
    for (let i = 0; i < count; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.background = "#" + Math.floor(Math.random() * 16777215).toString(16);
        confetti.style.animationDuration = (Math.random() * 2 + 1) + "s";
        confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3500);
    }
}

// FIREWORKS
function startFireworks() {
    if (fireworksRunning) return;
    fireworksRunning = true;

    fwCanvas = document.getElementById("fireworksCanvas");
    fwCtx = fwCanvas.getContext("2d");
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    particles = [];
    launchFirework();
    fwAnimationId = requestAnimationFrame(fireworksLoop);
}

function stopFireworks() {
    fireworksRunning = false;
    cancelAnimationFrame(fwAnimationId);
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    particles = [];
}

function resizeCanvas() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
}

function launchFirework() {
    const x = Math.random() * fwCanvas.width * 0.8 + fwCanvas.width * 0.1;
    const y = Math.random() * fwCanvas.height * 0.5 + fwCanvas.height * 0.1;
    const colors = ["#ff4b4b", "#ffd93b", "#3bff7a", "#3bbdff", "#ff3bde"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const count = 60;
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 4 + 2;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color,
            radius: Math.random() * 3 + 2
        });
    }

    if (fireworksRunning) {
        setTimeout(launchFirework, 600 + Math.random() * 700);
    }
}

function fireworksLoop() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.alpha -= 0.01;

        fwCtx.globalAlpha = Math.max(p.alpha, 0);
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fwCtx.fillStyle = p.color;
        fwCtx.fill();
    });

    particles = particles.filter(p => p.alpha > 0);

    if (fireworksRunning) {
        fwAnimationId = requestAnimationFrame(fireworksLoop);
    }
}
