document.addEventListener('DOMContentLoaded', () => {

    // Effekt für Buttons und Links beim Klick
    const ctaButtons = document.querySelectorAll('.cta-button');
    const navLinks = document.querySelectorAll('nav a');

    const addRippleEffect = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    ctaButtons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', addRippleEffect);
    });

    // Optionale Animation beim Scrollen
    const pageSections = document.querySelectorAll('.page-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    pageSections.forEach(section => {
        observer.observe(section);
    });

    // Kopierfunktion für die Telefonnummer
    const phoneNumberElement = document.getElementById('phone-number');

    if (phoneNumberElement) {
        phoneNumberElement.addEventListener('click', () => {
            const phoneNumber = phoneNumberElement.textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                // Kurzes Feedback für den Nutzer
                phoneNumberElement.textContent = 'Kopiert!';
                setTimeout(() => {
                    phoneNumberElement.textContent = phoneNumber;
                }, 2000);
            }).catch(err => {
                console.error('Kopieren fehlgeschlagen: ', err);
            });
        });
    }
});
// Chatbot-Logik
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const closeBtn = document.getElementById('close-btn');
const messagesContainer = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Anzeigen/Verbergen des Chatbot-Fensters
chatbotIcon.addEventListener('click', () => {
    chatbotWindow.classList.toggle('visible');
});

closeBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('visible');
});

// Vordefinierte Antworten, basierend auf Keywords
const chatbotResponses = [
    {
        keywords: ["hallo", "hey", "hi"],
        response: "Hallo! Wie kann ich dir helfen?"
    },
    {
        keywords: ["fächer", "fach", "unterricht"],
        response: "Ich biete Nachhilfe in so ziemlich allen Fächern der Mathematik. Lasse mir einfach deine Unterlagen zukommen und ich schaue mir das ganze schnellstmöglich an!"
    },
    {
        keywords: ["preis","prei", "kosten","Kosten", "was kostet","kostet", "Preis", "wie viel"],
        response: "Eine Probelektion kostet 15 CHF, die nach Ablauf der Stunde vom Regulärpreis von 25CHF abgelöst wird."
    },
    {
        keywords: ["termin", "buchen", "verfügbarkeit","Zeit","zeitliche","Verfügbarkeit","Wann"],
        response: "Termine sind grundsätzlich von Montag bis und mit Sonntag von 08:30 bis 22:00 Uhr zu buchen."
    },
    {
        keywords: ["danke", "dankeschön", "super"],
        response: "Gern geschehen! Ich helfe dir gerne weiter."
    },
    {
        keywords: ["kontakt", "email", "telefon"],
        response: "Du findest meine Kontaktinformationen direkt hier auf der Seite."
    }
    {
        keywords: ["price","price?","Price?","coast", "cost","costs", "how much","How much","how much?", "How much?"],
        response: "Eine Probelektion kostet 15 CHF, die nach Ablauf der Stunde vom Regulärpreis von 25CHF abgelöst wird."
    },
];

// Nachricht senden
const sendMessage = () => {
    const userMessage = userInput.value.toLowerCase().trim();
    if (userMessage === "") return;

    // Benutzer-Nachricht anzeigen
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = userMessage;
    messagesContainer.appendChild(userMessageDiv);

    // Automatisch zum Ende scrollen
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Chatbot-Antwort generieren
    setTimeout(() => {
        let botResponse = "Entschuldigung, das habe ich nicht verstanden. Frage mich nach 'Fächern', 'Preisen' oder einem 'Termin'."; // Standardantwort

        for (const res of chatbotResponses) {
            if (res.keywords.some(keyword => userMessage.includes(keyword))) {
                botResponse = res.response;
                break;
            }
        }
        
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.textContent = botResponse;
        messagesContainer.appendChild(botMessageDiv);
        
        // Automatisch zum Ende scrollen
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500); // Verzögerung für realistisches Tippen

    userInput.value = "";
};

// Event-Listener für das Senden
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }

});
