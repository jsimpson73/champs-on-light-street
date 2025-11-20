
// Admin JavaScript for managing events and promotions
let events = [];
let promotions = [];

// DOM Elements
const eventsList = document.getElementById('events-list');
const promotionsList = document.getElementById('promotions-list');
const eventForm = document.getElementById('event-form');
const promotionForm = document.getElementById('promotion-form');

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventForm();
    setupPromotionForm();
    renderEvents();
    renderPromotions();
});

// Load data from localStorage
function loadData() {
    const savedEvents = localStorage.getItem('champsEvents');
    const savedPromotions = localStorage.getItem('champsPromotions');
    
    events = savedEvents ? JSON.parse(savedEvents) : [
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
    
    promotions = savedPromotions ? JSON.parse(savedPromotions) : [
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
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('champsEvents', JSON.stringify(events));
    localStorage.setItem('champsPromotions', JSON.stringify(promotions));
}

// Setup event form
function setupEventForm() {
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newEvent = {
                id: Date.now(),
                title: document.getElementById('event-title').value,
                date: document.getElementById('event-date').value,
                time: document.getElementById('event-time').value,
                description: document.getElementById('event-description').value,
                image: document.getElementById('event-image').value
            };
            
            events.unshift(newEvent);
            saveData();
            renderEvents();
            eventForm.reset();
            hideAddEventForm();
            
            alert('Event added successfully!');
        });
    }
}

// Setup promotion form
function setupPromotionForm() {
    if (promotionForm) {
        promotionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPromotion = {
                id: Date.now(),
                title: document.getElementById('promo-title').value,
                date: document.getElementById('promo-date').value,
                description: document.getElementById('promo-description').value,
                image: document.getElementById('promo-image').value
            };
            
            promotions.unshift(newPromotion);
            saveData();
            renderPromotions();
            promotionForm.reset();
            hideAddPromotionForm();
            
            alert('Promotion added successfully!');
        });
    }
}

// Render events
function renderEvents() {
    if (eventsList) {
        eventsList.innerHTML = '';
        
        if (events.length === 0) {
            eventsList.innerHTML = '<p class="empty-message">No events yet. Add your first event above!</p>';
            return;
        }
        
        events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
        });
    }
}

// Render promotions
function renderPromotions() {
    if (promotionsList) {
        promotionsList.innerHTML = '';
        
        if (promotions.length === 0) {
            promotionsList.innerHTML = '<p class="empty-message">No promotions yet. Add your first promotion above!</p>';
            return;
        }
        
        promotions.forEach(promo => {
            const promoCard = createPromotionCard(promo);
            promotionsList.appendChild(promoCard);
        });
    }
}

// Create event card for admin
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <button class="delete-btn" onclick="deleteEvent(${event.id})" title="Delete Event">\u00d7</button>
        <img src="${event.image}" alt="${event.title}">
        <h4>${event.title}</h4>
        <p class="item-date">${event.date} \u2022 ${event.time}</p>
        <p>${event.description}</p>
    `;
    return card;
}

// Create promotion card for admin
function createPromotionCard(promo) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <button class="delete-btn" onclick="deletePromotion(${promo.id})" title="Delete Promotion">\u00d7</button>
        <img src="${promo.image}" alt="${promo.title}">
        <h4>${promo.title}</h4>
        <p class="item-date">${promo.date}</p>
        <p>${promo.description}</p>
    `;
    return card;
}

// Delete event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== id);
        saveData();
        renderEvents();
        alert('Event deleted successfully!');
    }
}

// Delete promotion
function deletePromotion(id) {
    if (confirm('Are you sure you want to delete this promotion?')) {
        promotions = promotions.filter(promo => promo.id !== id);
        saveData();
        renderPromotions();
        alert('Promotion deleted successfully!');
    }
}

// Show/hide forms
function showAddEventForm() {
    document.getElementById('add-event-form').style.display = 'block';
    document.getElementById('add-event-form').scrollIntoView({ behavior: 'smooth' });
}

function hideAddEventForm() {
    document.getElementById('add-event-form').style.display = 'none';
}

function showAddPromotionForm() {
    document.getElementById('add-promotion-form').style.display = 'block';
    document.getElementById('add-promotion-form').scrollIntoView({ behavior: 'smooth' });
}

function hideAddPromotionForm() {
    document.getElementById('add-promotion-form').style.display = 'none';
}
