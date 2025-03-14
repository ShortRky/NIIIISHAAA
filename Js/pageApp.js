// Data
const products = [
    {
        name: "Quantum AI Suite",
        price: 299,
        features: ["Neural Networks", "Predictive Analytics", "Real-time Processing"],
        description: "Advanced AI platform for enterprise solutions"
    },
    {
        name: "CyberShield Pro",
        price: 499,
        features: ["Threat Detection", "Data Encryption", "Network Monitoring"],
        description: "Enterprise-grade cybersecurity solution"
    },
    {
        name: "Cloud Nexus",
        price: 899,
        features: ["Auto-scaling", "Global CDN", "99.9% Uptime"],
        description: "Scalable cloud infrastructure platform"
    }
];

const features = [
    {
        icon: "rocket",
        title: "Lightning Fast",
        description: "Optimized for maximum performance"
    },
    {
        icon: "shield-alt",
        title: "Secure",
        description: "Military-grade encryption"
    },
    {
        icon: "chart-line",
        title: "Analytics",
        description: "Real-time data insights"
    }
];

// App State
let currentProductIndex = 0;
let carouselItems = [];

// DOM Elements
const carouselTrack = document.getElementById('carouselTrack');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    loadFeatures();
    setupEventListeners();
});

// Carousel Functions
function initializeCarousel() {
    carouselTrack.innerHTML = products.map((product, index) => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="price-tag">$${product.price}/mo</div>
            <ul class="features-list">
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            ${index > 0 ? `<p class="previous-benefits">Including previous benefits</p>` : ''}
            <button class="cta-primary">Start Free Trial</button>
        </div>
    `).join('');

    carouselItems = document.querySelectorAll('.product-card');
    updateCarousel();
}

function updateCarousel() {
    const cardWidth = carouselItems[0].offsetWidth + 40;
    carouselTrack.style.transform = `translateX(-${currentProductIndex * cardWidth}px)`;
    
    carouselItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentProductIndex);
    });
}

// Feature Loading
function loadFeatures() {
    const featuresContainer = document.querySelector('.features-grid');
    featuresContainer.innerHTML = features.map(feature => `
        <div class="feature-card">
            <i class="fas fa-${feature.icon}"></i>
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
        </div>
    `).join('');
}

// Event Handlers
function setupEventListeners() {
    // Carousel Navigation
    document.getElementById('leftArrow').addEventListener('click', () => {
        currentProductIndex = (currentProductIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });

    document.getElementById('rightArrow').addEventListener('click', () => {
        currentProductIndex = (currentProductIndex + 1) % carouselItems.length;
        updateCarousel();
    });

    // Watch Demo Button
    document.getElementById('demoBtn').addEventListener('click', () => {
        alert("No Demo Currently!"); // Replace with modal functionality if needed
    });

    // Explore Products Button
    document.getElementById('exploreBtn').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
}