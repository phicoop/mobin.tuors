document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    //  EINSTELLUNGEN – hier kannst du den Bot ohne Programmierkenntnisse anpassen
    // =====================================================================
    const SETTINGS = {
        // true = Mobin ist gerade nicht erreichbar. Buchungs- und Kontaktantworten
        // bekommen dann automatisch den Hinweis unten angehängt.
        paused: false,
        pausedNote: {
            de: "Hinweis: Mobin ist wegen der aktuellen Lage in seinem Land vorübergehend nicht erreichbar. Du kannst deine Anfrage trotzdem über das Kontaktformular auf dieser Seite senden, sie wird weitergeleitet.",
            en: "Note: Due to the current situation in his country, Mobin is temporarily unreachable. You can still send your request through the contact form on this page and it will be passed on."
        },
        replyDelay: 450, // Millisekunden, bis der Bot antwortet
        blink: true,          // Chatbot-Symbol blinzelt ab und zu
        blinkEvery: [3, 6]    // zufällig alle 3 bis 6 Sekunden
    };

    // =====================================================================
    //  ÜBERSETZUNGEN DER SEITE
    // =====================================================================
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
            about_text1: "Ich bin ein leidenschaftlicher Nachhilfelehrer mit drei Jahren Erfahrung in der Vermittlung verschiedener Mathematikfächer. Bisher haben alle meine Schülerinnen und Schüler ihre Matheprüfungen erfolgreich bestanden. Mein Ziel ist es, nicht nur Wissen zu vermitteln, sondern auch das Selbstvertrauen meiner Schülerinnen und Schüler zu stärken. Ich glaube daran, dass jeder lernen kann, wenn er die richtige Unterstützung erhält.",
            about_text2: "In meinen Stunden gehe ich auf deine individuellen Bedürfnisse ein und erstelle massgeschneiderte Lernpläne. Gemeinsam überwinden wir Schwierigkeiten und machen das Lernen zu einem positiven Erlebnis. Ob Algebra, Analysis, diskrete Mathematik oder ein anderes Mathematikfach – ich helfe dir, deine Ziele zu erreichen.",
            about_text3: "Der Unterricht findet auf Englisch über Zoom statt und kann von Montag bis Sonntag zwischen 08:30 und 22:00 Uhr gebucht werden. Die Probelektion kostet pauschal 15 CHF, unabhängig von der Dauer, eine reguläre Lektion von 1 Stunde 20 Minuten kostet 35 CHF. Unterrichtet werden alle Stufen, solange Englisch als Unterrichtssprache für dich kein Problem ist.",
            contact_title: "Kontakt & Buchen",
            contact_subtitle: "Bereit für den nächsten Schritt? Nimm Kontakt auf oder buche direkt eine Probestunde.",
            contact_info_title: "Kontaktinformationen",
            contact_info_link: "WhatsApp-Nachricht senden",
            cta_contact: "Probestunde anfragen",
            contact_form_title: "Direkt eine Nachricht senden",
            form_name_placeholder: "Dein Name",
            form_email_placeholder: "Deine E-Mail-Adresse",
            form_message_placeholder: "Deine Nachricht",
            form_send_button: "Senden",
            imprint_title: "Impressum",
            imprint_content1: "Mobin Ekthiari<br>Peter-Debye-Weg<br>8045 Zürich<br><br><strong>Kontakt:</strong><br>Telefon: 0778146402<br>E-Mail: mobin.tutors@gmail.com",
            imprint_content2: "<strong>Verantwortlich für den Inhalt:</strong><br>Mobin Ekthiari",
            footer_text: "&copy; 2025 Mobintutors. Alle Rechte vorbehalten.",
            chatbot_title: "Fragen an den Nachhilfe-Bot",
            chatbot_intro: "Hast du Fragen zum Unterricht, zu den Kosten oder zu freien Zeiten? Frag mich einfach!",
            chatbot_placeholder: "Nachricht eingeben...",
            copy_text: "Kopiert!",
            copy_error: "Kopieren fehlgeschlagen."
        },
        en: {
            title: "Mobintutors - Your Tutor",
            logo: "Mobin.tutors!",
            nav_about: "About Me",
            nav_contact: "Contact & Booking",
            nav_imprint: "Imprint",
            hero_title: "Learning made easy.",
            hero_subtitle: "Professional math tutoring that helps you succeed.",
            cta_home: "Book now!",
            about_title: "About Me",
            about_name: "Hi, I'm Mobin",
            about_text1: "I'm a passionate mathematics graduate with three years of teaching experience, first as a teaching assistant and now as an online tutor. So far, every one of my students has passed their math exams. My goal is not just to pass on knowledge but to strengthen my students' confidence. I believe everyone can learn with the right support.",
            about_text2: "In my sessions, I focus on your individual needs and create customized learning plans. Together, we overcome challenges and make learning a positive experience. Whether it's algebra, calculus, discrete math or another area of mathematics, I'm here to help you reach your goals.",
            about_text3: "Sessions are held in English over Zoom and can be booked Monday to Sunday from 08:30 to 22:00. The trial lesson costs a flat 15 CHF regardless of length, and a regular lesson of 1 hour 20 minutes costs 35 CHF. All levels are welcome, as long as learning in English works for you.",
            contact_title: "Contact & Booking",
            contact_subtitle: "Ready for the next step? Get in touch or book a trial lesson directly.",
            contact_info_title: "Contact Information",
            contact_info_link: "Send a WhatsApp message",
            cta_contact: "Request a trial lesson",
            contact_form_title: "Send a direct message",
            form_name_placeholder: "Your name",
            form_email_placeholder: "Your email address",
            form_message_placeholder: "Your message",
            form_send_button: "Send",
            imprint_title: "Imprint",
            imprint_content1: "Mobin Ekthiari<br>Peter-Debye-Weg<br>8045 Zürich<br><br><strong>Contact:</strong><br>Phone: 0778146402<br>Email: mobin.tutors@gmail.com",
            imprint_content2: "<strong>Responsible for the content:</strong><br>Mobin Ekthiari",
            footer_text: "&copy; 2025 Mobintutors. All rights reserved.",
            chatbot_title: "Questions for the Tutoring Bot",
            chatbot_intro: "Questions about lessons, prices or availability? Just ask!",
            chatbot_placeholder: "Type a message...",
            copy_text: "Copied!",
            copy_error: "Copy failed."
        }
    };

    const languageSwitcher = document.getElementById('language-switcher');
    const getLang = () => (languageSwitcher && translations[languageSwitcher.value]) ? languageSwitcher.value : 'de';

    const updateContent = (lang) => {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const text = translations[lang][key];
            if (!text) return;
            if (key.includes('imprint_content') || key.includes('footer_text')) {
                element.innerHTML = text;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });
        document.title = translations[lang].title;
    };

    updateContent(getLang());
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', () => {
            updateContent(getLang());
            renderQuickReplies(); // Schnellantwort-Knöpfe in neuer Sprache
        });
    }

    // =====================================================================
    //  RIPPLE-EFFEKT, SCROLL-ANIMATION, TELEFONNUMMER KOPIEREN (wie bisher)
    // =====================================================================
    const addRippleEffect = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };
    document.querySelectorAll('.cta-button, nav a').forEach(el => el.addEventListener('click', addRippleEffect));

    // Abschnitte einmalig sanft einblenden. Die Klasse "js-ready" sorgt dafür,
    // dass Text nur versteckt wird, wenn dieses Script auch wirklich läuft.
    const sections = document.querySelectorAll('.page-section');
    if ('IntersectionObserver' in window) {
        document.documentElement.classList.add('js-ready');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
        sections.forEach(section => observer.observe(section));
    } else {
        sections.forEach(section => section.classList.add('visible'));
    }

    const phoneNumberElement = document.getElementById('phone-number');
    if (phoneNumberElement) {
        phoneNumberElement.addEventListener('click', () => {
            const phoneNumber = phoneNumberElement.textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const originalText = phoneNumberElement.textContent;
                phoneNumberElement.textContent = translations[getLang()].copy_text;
                setTimeout(() => { phoneNumberElement.textContent = originalText; }, 2000);
            }).catch(err => console.error(translations[getLang()].copy_error, err));
        });
    }

    // =====================================================================
    //  CHATBOT – WISSENSBASIS
    //  keywords: Wörter oder Phrasen (klein, Umlaute egal). Wortanfänge reichen,
    //  z.B. "kost" passt auf "kostet", "kosten", "kostenlos".
    //  pausedNote: true = bei pausiertem Betrieb den Hinweis anhängen.
    //  weight: < 1 = schwächer (z.B. Begrüssung verliert gegen echte Fragen).
    // =====================================================================
    const intents = [
        {
            id: 'greeting', weight: 0.5,
            keywords: ['hallo', 'hey', 'hi', 'hoi', 'gruezi', 'gruessech', 'salut', 'servus', 'moin', 'guten tag', 'guten morgen', 'guten abend', 'hello', 'good morning', 'good evening'],
            de: "Hallo! Ich beantworte Fragen zu Preisen, Fächern, Zeiten, der Probestunde und mehr. Was möchtest du wissen?",
            en: "Hello! I can answer questions about prices, subjects, times, the trial lesson and more. What would you like to know?"
        },
        {
            id: 'status',
            keywords: ['erreichbar', 'pause', 'ausser betrieb', 'geschlossen', 'wo ist mobin', 'geht es mobin', 'status', 'aktuell', 'momentan', 'unavailable', 'reachable', 'closed', 'where is mobin', 'is mobin ok'],
            de: () => SETTINGS.paused
                ? SETTINGS.pausedNote.de
                : "Mobin ist aktuell erreichbar und nimmt gerne neue Schülerinnen und Schüler an.",
            en: () => SETTINGS.paused
                ? SETTINGS.pausedNote.en
                : "Mobin is currently available and happy to take on new students."
        },
        {
            id: 'price',
            keywords: ['preis', 'kost', 'tarif', 'gebuehr', 'chf', 'franken', 'geld', 'teuer', 'guenstig', 'billig', 'wie viel', 'wieviel', 'price', 'cost', 'fee', 'rate', 'expensive', 'cheap', 'how much'],
            de: "Die Probelektion kostet pauschal 15 CHF, egal wie lange sie dauert. Eine reguläre Lektion dauert 1 Stunde 20 Minuten und kostet 35 CHF.",
            en: "The trial lesson costs a flat 15 CHF, no matter how long it takes. A regular lesson lasts 1 hour 20 minutes and costs 35 CHF."
        },
        {
            id: 'payment',
            keywords: ['bezahl', 'zahl', 'twint', 'bar', 'ueberweis', 'paypal', 'karte', 'pay', 'payment', 'card', 'cash'],
            de: "Die Zahlungsart wird bei der Buchung direkt abgesprochen. Schreib einfach über das Kontaktformular, welche Variante dir am besten passt.",
            en: "The payment method is agreed on directly when you book. Just mention your preferred option in the contact form."
        },
        {
            id: 'trial', pausedNote: true,
            keywords: ['probe', 'schnupper', 'kennenlern', 'erste stunde', 'erste lektion', 'gratis', 'kostenlos', 'trial', 'first lesson', 'test lesson', 'free lesson'],
            de: "Die Probelektion kostet pauschal 15 CHF und hat keine feste Dauer – sie dauert so lange, wie du brauchst. Dabei lernt ihr euch kennen, Mobin schaut sich deinen Stoff an und ihr legt gemeinsam einen Plan fest. Anfragen kannst du sie über den Knopf «Probestunde anfragen» oder das Kontaktformular.",
            en: "The trial lesson costs a flat 15 CHF and has no fixed length – it takes as long as you need. You get to know each other, Mobin looks at your material, and together you set a plan. You can request it with the «Request a trial lesson» button or the contact form."
        },
        {
            id: 'subjects',
            keywords: ['fach', 'faecher', 'thema', 'themen', 'mathe', 'algebra', 'lineare algebra', 'analysis', 'calculus', 'diskret', 'statistik', 'stochastik', 'wahrscheinlichkeit', 'geometrie', 'beweis', 'integral', 'ableitung', 'funktion', 'gleichung', 'matrix', 'subject', 'topic', 'math', 'linear', 'probability', 'statistics', 'proof', 'derivative', 'equation'],
            de: "Mobin unterrichtet so ziemlich alle Bereiche der Mathematik, zum Beispiel Algebra, lineare Algebra, Analysis und diskrete Mathematik. Schick ihm am besten vorab deine Unterlagen, dann kann er sich optimal vorbereiten.",
            en: "Mobin teaches almost every area of mathematics, for example algebra, linear algebra, calculus and discrete math. It's best to send your materials in advance so he can prepare properly."
        },
        {
            id: 'other_subjects',
            keywords: ['physik', 'chemie', 'biologie', 'informatik', 'programmier', 'wirtschaft', 'franzoesisch', 'physics', 'chemistry', 'biology', 'computer science', 'programming', 'coding', 'economics'],
            de: "Der Schwerpunkt liegt klar auf Mathematik. Bei Fächern mit viel Mathe, etwa Physik oder Informatik-Theorie, lohnt sich eine kurze Anfrage über das Kontaktformular.",
            en: "The focus is clearly on mathematics. For math-heavy subjects like physics or theoretical computer science, it's worth sending a quick request through the contact form."
        },
        {
            id: 'gymnasium',
            keywords: ['gymi', 'gymnasium', 'gymnasiast', 'kanti', 'kantonsschule', 'mittelschule', 'matura', 'maturitaet', 'maturaarbeit', 'aufnahmepruefung', 'gymipruefung', 'high school', 'secondary school', 'a level'],
            de: "Ja, Mobin gibt auch Lektionen für Schülerinnen und Schüler am Gymnasium bzw. an der Kanti, zum Beispiel zur Vorbereitung auf Prüfungen oder die Matura. Der Unterricht findet allerdings nur auf Englisch statt.",
            en: "Yes, Mobin also teaches high school students, for example to prepare for exams or the Matura. Lessons are held in English only."
        },
        {
            id: 'level',
            keywords: ['niveau', 'stufe', 'uni', 'universitaet', 'eth', 'epfl', 'fh', 'fachhochschule', 'hochschule', 'bachelor', 'master', 'phd', 'doktor', 'sek', 'oberstufe', 'primar', 'level', 'college', 'university', 'grade'],
            de: "Mobin unterrichtet alle Stufen, von der Schule über Gymnasium/Kanti bis zu Fachhochschule, Universität und ETH. Einzige Voraussetzung: Der Unterricht findet auf Englisch statt, das sollte für dich also kein Problem sein. Mobin hat auch schon ETH- und Doktoratsstudierende begleitet.",
            en: "Mobin teaches all levels, from school and high school to college, university and ETH. The only requirement is that lessons are in English, so that needs to work for you. Mobin has also tutored ETH and PhD students."
        },
        {
            id: 'exam',
            keywords: ['pruefung', 'basispruefung', 'klausur', 'test', 'vorbereit', 'lernplan', 'durchgefallen', 'nachpruefung', 'bestehen', 'bestanden', 'erfolg', 'note', 'noten', 'exam', 'midterm', 'final', 'prepare', 'preparation', 'failed', 'pass', 'grade', 'success'],
            de: "Prüfungsvorbereitung ist ein Schwerpunkt. Mobin erstellt dir einen Lernplan, geht alte Prüfungen mit dir durch und übt gezielt deine Schwachstellen. Bisher haben alle seine Schülerinnen und Schüler ihre Matheprüfungen bestanden. Je früher du dich meldest, desto besser lässt sich planen.",
            en: "Exam preparation is a key focus. Mobin creates a study plan, works through past exams with you and targets your weak spots. So far, all of his students have passed their math exams. The earlier you get in touch, the better you can plan."
        },
        {
            id: 'times', pausedNote: true,
            keywords: ['termin', 'zeit', 'wann', 'uhr', 'verfuegbar', 'wochenende', 'samstag', 'sonntag', 'abends', 'morgens', 'heute', 'uebermorgen', 'appointment', 'schedule', 'availab', 'when', 'weekend', 'evening', 'today', 'tomorrow'],
            de: "Lektionen sind von Montag bis Sonntag zwischen 08:30 und 22:00 Uhr möglich, also auch am Wochenende und abends.",
            en: "Lessons are possible Monday to Sunday between 08:30 and 22:00, including weekends and evenings."
        },
        {
            id: 'booking', pausedNote: true,
            keywords: ['buch', 'anmeld', 'reservier', 'anfangen', 'starten', 'beginnen', 'book', 'sign up', 'register', 'start', 'begin'],
            de: "Buchen kannst du über das Kontaktformular oder den Knopf «Probestunde anfragen». Schreib kurz dein Fach, dein Niveau und wann du Zeit hast.",
            en: "You can book through the contact form or the «Request a trial lesson» button. Briefly mention your subject, your level and when you're free."
        },
        {
            id: 'duration',
            keywords: ['dauer', 'wie lange', 'minuten', 'stunde lang', 'how long', 'duration', 'minutes', 'length'],
            de: "Eine reguläre Lektion dauert 1 Stunde 20 Minuten (80 Minuten). Die Probelektion hat keine feste Dauer. Wenn du kürzere oder längere Einheiten brauchst, lässt sich das absprechen.",
            en: "A regular lesson lasts 1 hour 20 minutes (80 minutes). The trial lesson has no fixed length. Shorter or longer sessions can be arranged."
        },
        {
            id: 'online',
            keywords: ['zoom', 'online', 'video', 'whiteboard', 'tablet', 'ipad', 'stift', 'laptop', 'kamera', 'mikrofon', 'technik', 'vor ort', 'persoenlich', 'praesenz', 'zuerich', 'stil', 'arbeitsweise', 'ablauf', 'wie laeuft', 'pen', 'camera', 'in person', 'how does it work', 'style'],
            de: "Der Unterricht läuft online über Zoom mit dem integrierten Whiteboard. Ideal ist ein Tablet oder Grafikstift, damit du Aufgaben live mitlösen kannst, nötig ist das aber nicht. Zoom ist gratis und funktioniert auch im Browser. Falls Zoom für dich nicht geht, findet ihr eine andere Lösung.",
            en: "Lessons take place online via Zoom using its built-in whiteboard. 
