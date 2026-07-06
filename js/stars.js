const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const colors = [
    "#ffffff",
    "#7dd3fc",
    "#67e8f9",
    "#c084fc"
];

class Star {

    constructor() {
        this.reset();
    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 1.8 + 0.2;

        this.speed = Math.random() * 0.12 + 0.03;

        this.alpha = Math.random() * 0.8 + 0.2;

        this.twinkle = (Math.random() * 0.015) + 0.004;

        this.color = colors[Math.floor(Math.random() * colors.length)];

    }

    update() {

        this.y -= this.speed;

        this.alpha += this.twinkle;

        if (this.alpha > 1 || this.alpha < 0.2) {
            this.twinkle *= -1;
        }

        if (this.y < -5) {
            this.y = canvas.height + 5;
            this.x = Math.random() * canvas.width;
        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        ctx.fill();

    }

}

for (let i = 0; i < 250; i++) {
    stars.push(new Star());
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // subtle motion blur
    ctx.fillStyle = "rgba(5,8,20,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);

}

animate();