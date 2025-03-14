const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle system
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.alpha = Math.min(1, this.alpha + 0.005);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
    }
}

// Create particles
const particles = Array(100).fill().map(() => new Particle());

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}
animate();

// Form switching with advanced animations
document.querySelectorAll('.switch-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = e.target.dataset.target;
        const currentForm = document.querySelector('.auth-box:not(.hidden)');
        const targetForm = document.getElementById(`${target}Form`);

        // Animate out current form
        currentForm.style.transition = 'all 0.4s cubic-bezier(0.87, 0, 0.13, 1)';
        currentForm.classList.add('hidden');

        // Animate in new form
        setTimeout(() => {
            targetForm.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            targetForm.classList.remove('hidden');
            
            setTimeout(() => {
                currentForm.style.transition = '';
                targetForm.style.transition = '';
            }, 600);
        }, 200);
    });
});

// Form submission
document.querySelectorAll('.auth-box').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const entries = Object.fromEntries(formData.entries());
        
        let isValid = true;
        form.querySelectorAll('input').forEach(input => {
            if (!input.checkValidity()) {
                input.parentElement.querySelector('.highlight').style.background = '#ff6b6b';
                isValid = false;
            }
        });

        if (isValid) {
            form.style.transform = 'translateY(-20px)';
            form.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = 'app.html';
            }, 500);
        }
    });
});

// Input validation reset
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        input.parentElement.querySelector('.highlight').style.background = 
            'linear-gradient(90deg, #4ecdc4, #45b7d1)';
    });
});

// Floating squares animation
function createFloatingSquare() {
    const square = document.createElement('div');
    square.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        animation: float 8s infinite;
    `;
    
    square.style.left = Math.random() * 100 + '%';
    square.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(square);
    
    setTimeout(() => square.remove(), 8000);
}

// Dynamic CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        50% { transform: translateY(-100vh) rotate(360deg); opacity: 1; }
        100% { transform: translateY(-200vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start floating squares
setInterval(createFloatingSquare, 1500);