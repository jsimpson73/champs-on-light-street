
// Sample data for events and promotions
let events = [
    {
        id: 1,
        title: "Thursday Night Karaoke",
        date: "Every Thursday",
        time: "8:00 PM - 12:00 AM",
        description: "Show off your singing skills at our legendary Thursday karaoke night! Great prizes and drink specials all night long.",
        image: "https://images.unsplash.com/photo-1516280446009-3e7c5b8b5c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Happy Hour Specials",
        date: "Monday-Friday",
        time: "4:00 PM - 7:00 PM",
        description: "Half-price drinks and appetizers during happy hour. Perfect way to unwind after work!",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

let promotions = [
    {
        id: 1,
        title: "Karaoke Thursday Specials",
        date: "Every Thursday",
        description: "Sing your heart out and enjoy $4 beers and $6 mixed drinks all night!",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Weekend Beer Buckets",
        date: "Friday-Sunday",
        description: "Get a bucket of 5 beers for just $20 - perfect for sharing with friends!",
        image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// DOM Elements
const eventsContainer = document.getElementById('events-container');
const promotionsContainer = document.getElementById('promotions-container');
const contactForm = document.getElementById('contact-form');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    loadPromotions();
    setupContactForm();
    setupAdminButton();
});

// Load events
function loadEvents() {
    if (eventsContainer) {
        eventsContainer.innerHTML = '';
        
        events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsContainer.appendChild(eventCard);
        });
    }
}

// Load promotions
function loadPromotions() {
    if (promotionsContainer) {
        promotionsContainer.innerHTML = '';
        
        promotions.forEach(promo => {
            const promoCard = createPromotionCard(promo);
            promotionsContainer.appendChild(promoCard);
        });
    }
}

// Create event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="event-image">
        <h3>${event.title}</h3>
        <p class="event-date">${event.date} \u2022 ${event.time}</p>
        <p class="event-description">${event.description}</p>
    `;
    return card;
}

// Create promotion card
function createPromotionCard(promo) {
    const card = document.createElement('div');
    card.className = 'promotion-card';
    card.innerHTML = `
        <img src="${promo.image}" alt="${promo.title}" class="promotion-image">
        <h3>${promo.title}</h3>
        <p class="promotion-date">${promo.date}</p>
        <p class="promotion-description">${promo.description}</p>
    `;
    return card;
}

// Setup contact form
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, this would send to a server
            alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
            
            contactForm.reset();
        });
    }
}

// Setup admin button
function setupAdminButton() {
    const adminButton = document.createElement('div');
    adminButton.className = 'admin-button';
    adminButton.title = 'Admin Panel';
    adminButton.addEventListener('click', () => {
        window.location.href = 'admin/index.html';
    });
    document.body.appendChild(adminButton);
}

// Admin functions (for admin panel)
function addEvent(eventData) {
    events.unshift({
        id: Date.now(),
        ...eventData
    });
    saveData();
    loadEvents();
}

function addPromotion(promoData) {
    promotions.unshift({
        id: Date.now(),
        ...promoData
    });
    saveData();
    loadPromotions();
}

function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    saveData();
    loadEvents();
}

function deletePromotion(id) {
    promotions = promotions.filter(promo => promo.id !== id);
    saveData();
    loadPromotions();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('champsEvents', JSON.stringify(events));
    localStorage.setItem('champsPromotions', JSON.stringify(promotions));
}

// Load data from localStorage
function loadData() {
    const savedEvents = localStorage.getItem('champsEvents');
    const savedPromotions = localStorage.getItem('champsPromotions');
    
    if (savedEvents) {
        events = JSON.parse(savedEvents);
    }
    
    if (savedPromotions) {
        promotions = JSON.parse(savedPromotions);
    }
}

// Initialize data from storage
loadData();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
