document.addEventListener('DOMContentLoaded', () => {

    // Zentrales Objekt für alle Übersetzungen
    const translations = {
        de: {
            title: "Mobintutors - Dein Nachhilfelehrer",
            logo: "Mobin.tutors!",
            nav_about: "Über mich",
            nav_contact: "Kontakt & Buchen",
            nav_imprint: "Impressum",
            hero_title: "Lernen leicht gemacht.",
            hero_subtitle: "Professionelle Nachhilfe, die dich wirklich weiterbringt.",
            cta_home: "Jetzt buchen!",
            about_title: "Über mich",
            about_name: "Hallo, ich bin Mobin",
            about_text1: "Ich bin ein leidenschaftlicher Nachhilfelehrer mit [ANZAHL] Jahren Erfahrung in der Vermittlung von [FÄCHER]. Mein Ziel ist es, nicht nur Wissen zu vermitteln, sondern auch das Selbstvertrauen meiner Schüler zu stärken. Ich glaube daran, dass jeder lernen kann, wenn er die richtige Unterstützung erhält.",
            about_text2: "In meinen Stunden konzentriere ich mich auf individuelle Bedürfnisse und erstelle maßgeschneiderte Lernpläne. Gemeinsam überwinden wir Schwierigkeiten und machen das Lernen zu einem positiven Erlebnis. Ob Mathe, Physik oder ein anderes Fach – ich helfe dir dabei, deine Ziele zu erreichen.",
            about_text3: "Der Unterricht findet über Zoom und auf englisch statt und kann von MO-SO von 08:30 bis 22:00 Uhr gebucht werden.",
            contact_title: "Kontakt & Buchen",
            contact_subtitle: "Bereit für den nächsten Schritt? Nimm Kontakt auf oder buche direkt eine Probestunde.",
            contact_info_title: "Kontaktinformationen",
            contact_info_link: "WhatsApp Nachricht senden",
            cta_contact: "Probestunde anfragen",
            contact_form_title: "Direkt eine Nachricht senden",
            form_name_placeholder: "Dein Name",
            form_email_placeholder: "Deine E-Mail-Adresse",
            form_message_placeholder: "Deine Nachricht",
            form_send_button: "Senden",
            imprint_title: "Impressum",
            imprint_content1: "Mobin<br>Peter-debye-weg<br>8045 Zürich",
            imprint_content2: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:",
            footer_text: "&copy; 2024 Mobintutors. Alle Rechte vorbehalten.",
            chatbot_title: "Fragen an den Nachhilfe-Bot",
            chatbot_intro: "Hast du fragen über den Unterricht, Kosten, zeitliche Verfügbarkeit oder ähnliches? Dann frag mich gerne!",
            chatbot_placeholder: "Nachricht eingeben...",
            copy_text: "Kopiert!",
            copy_error: "Kopieren fehlgeschlagen.",
            chatbot_default_response: "Entschuldigung, das habe ich nicht verstanden. Frage mich nach 'Fächern', 'Preisen' oder einem 'Termin'."
        },
        en: {
            title: "Mobintutors - Your Tutor",
            logo: "Mobin.tutors!",
            nav_about: "About Me",
            nav_contact: "Contact & Booking",
            nav_imprint: "Imprint",
            hero_title: "Learning made easy",
            hero_subtitle: "Professional tutoring that helps you succeed in Mathematics.",
            cta_home: "Book now!",
            about_title: "About Me",
            about_name: "Hi, I'm Mobin",
            about_text1: "I'm a passionate Math Bachelor graduate with 2 years of life experience in teaching as a teachingassistent and recently switched to online tutoring. My goal is not just to transfer knowledge but to strengthen my students' confidence. I believe that everyone can learn if they have the right support.",
            about_text2: "In my sessions, I focus on individual needs and create customized learning plans. Together, we overcome challenges and make learning a positive experience. Whether it's Algebra, Calculus or another subject – I'm here to help you achieve your goals. ",
            about_text3: "Sessions are held in english and over Zoom and can be booked from MO-SO from 08:30 till 22:00 pm. The trial lesson costs 15CHf and anything after that first hour will be accordning to the regular price of 25CHF/ hr if the trial lesson isn't exeeded in duration due to getting to know eachother or organisational talks rather than teaching. The lessons are tailored towards  Colledge/University/ETH leveled students",
            contact_title: "Contact & Booking",
            contact_subtitle: "Ready for the next step? Get in touch or book a trial lesson directly.",
            contact_info_title: "Contact Information",
            contact_info_link: "Send a WhatsApp message",
            cta_contact: "Request a trial lesson",
            contact_form_title: "Send a direct message",
            form_name_placeholder: "Your Name",
            form_email_placeholder: "Your E-mail Address",
            form_message_placeholder: "Your Message",
            form_send_button: "Send",
            imprint_title: "Imprint",
            imprint_content1: "Mobin<br>Peter-debye-weg<br>8045 Zürich",
            imprint_content2: "Responsible for content according to § 55 Abs. 2 RStV:",
            footer_text: "&copy; 2024 Mobintutors. All Rights Reserved.",
            chatbot_title: "Questions for the Tutoring Bot",
            chatbot_intro: "Do you have questions about the lessons, costs, availability, or similar topics? Feel free to ask me!",
            chatbot_placeholder: "Type a message...",
            copy_text: "Copied!",
            copy_error: "Copy failed.",
            chatbot_default_response: "I'm sorry, I didn't understand that. Ask me about 'subjects', 'prices' or 'booking'."
        }
    };
    
    const languageSwitcher = document.getElementById('language-switcher');
    
    const updateContent = (lang) => {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang][key]) {
                // Special handling for innerHTML (e.g., Impressum)
                if (key.includes('imprint_content') || key.includes('footer_text')) {
                    element.innerHTML = translations[lang][key];
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        document.title = translations[lang].title;
    };

    // Initialize with default language
    updateContent(languageSwitcher.value);

    // Event listener for language change
    languageSwitcher.addEventListener('change', (event) => {
        updateContent(event.target.value);
    });

    // Ripple effect and scroll animations (Your original code)
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
        setTimeout(() => { ripple.remove(); }, 600);
    };

    ctaButtons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });
    navLinks.forEach(link => {
        link.addEventListener('click', addRippleEffect);
    });

    const pageSections = document.querySelectorAll('.page-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });
    pageSections.forEach(section => { observer.observe(section); });

    // Phone number copy functionality
    const phoneNumberElement = document.getElementById('phone-number');
    if (phoneNumberElement) {
        phoneNumberElement.addEventListener('click', () => {
            const phoneNumber = phoneNumberElement.textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const originalText = phoneNumberElement.textContent;
                const currentLang = languageSwitcher.value;
                phoneNumberElement.textContent = translations[currentLang].copy_text;
                setTimeout(() => {
                    phoneNumberElement.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error(translations[languageSwitcher.value].copy_error, err);
            });
        });
    }

    // Chatbot-Logik
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-btn');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotResponses = [
        { keywords: ["hallo", "hey", "hi"], response: "Hallo! Wie kann ich dir helfen?", response_en: "Hello! How can I help you?" },
        { keywords: ["fächer", "fach", "unterricht", "subjects"], response: "Ich biete Nachhilfe in so ziemlich allen Fächern der Mathematik. Lasse mir einfach deine Unterlagen zukommen und ich schaue mir das ganze schnellstmöglich an!", response_en: "I offer tutoring in almost all subjects of mathematics. Just send me your documents and I will take a look at them as soon as possible!" },
        { keywords: ["preis", "kosten", "was kostet", "kostet", "price", "cost","how much","how much?", "much?","wie viel"], response: "Eine Probelektion kostet 15 CHF, die nach Ablauf der Stunde vom Regulärpreis von 25CHF abgelöst wird.", response_en: "A trial lesson costs 15 CHF, which is replaced by the regular price of 25CHF after the hour." },
        { keywords: ["termin", "buchen", "verfügbarkeit", "zeit", "wann", "appointment", "book", "availability", "time", "when"], response: "Termine sind grundsätzlich von Montag bis und mit Sonntag von 08:30 bis 22:00 Uhr zu buchen.", response_en: "Appointments can be booked from Monday to Sunday from 08:30 to 22:00." },
        { keywords: ["danke", "dankeschön", "super", "thanks", "thank you", "great"], response: "Gern geschehen! Ich helfe dir gerne weiter.", response_en: "You're welcome! I am happy to help you." },
        { keywords: ["kontakt", "email", "telefon", "contact", "phone"], response: "Du findest meine Kontaktinformationen direkt hier auf der Seite.", response_en: "You can find my contact information directly here on the page." }
    ];

    chatbotIcon.addEventListener('click', () => { chatbotWindow.classList.toggle('visible'); });
    closeBtn.addEventListener('click', () => { chatbotWindow.classList.remove('visible'); });

    const sendMessage = () => {
        const userMessage = userInput.value.toLowerCase().trim();
        if (userMessage === "") return;

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user-message');
        userMessageDiv.textContent = userMessage;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            const currentLang = languageSwitcher.value;
            let botResponse = translations[currentLang].chatbot_default_response;

            for (const res of chatbotResponses) {
                const keywordsToMatch = res.keywords;
                if (keywordsToMatch.some(keyword => userMessage.includes(keyword))) {
                    botResponse = res[`response${currentLang === 'en' ? '_en' : ''}`];
                    break;
                }
            }
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('message', 'bot-message');
            botMessageDiv.textContent = botResponse;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 500);

        userInput.value = "";
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});

