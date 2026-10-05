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
        blinkEvery: [3, 6],   // zufällig alle 3 bis 6 Sekunden

        // Online-Kalender (z.B. Calendly). Leer lassen = Buttons führen zum Kontaktformular.
        // Beispiel: bookingUrl: "https://calendly.com/mobintutors/probelektion",
        bookingUrl: "",

        // WhatsApp mit vorausgefüllter Nachricht. Nummer im internationalen Format,
        // ohne + und ohne Leerzeichen. Bitte prüfen, ob das Mobins WhatsApp-Nummer ist!
        // Leer lassen = der bisherige wa.link-Link bleibt.
        whatsappNumber: "989353821319",
        whatsappText: {
            de: "Hallo Mobin, ich interessiere mich für eine Probelektion in ",
            en: "Hi Mobin, I'm interested in a trial lesson in "
        },

        // Erfahrungsberichte. Nur echte Zitate mit Erlaubnis der Person eintragen!
        // Der Bereich erscheint automatisch, sobald hier mindestens ein Eintrag steht.
        // Beispiel:
        // { de: "Dank Mobin habe ich die Basisprüfung bestanden.", en: "Thanks to Mobin I passed my first-year exam.", name: "Lena", detail: "ETH, Maschinenbau" },
        testimonials: [
        ]
    };

    // =====================================================================
    //  ÜBERSETZUNGEN DER SEITE
    // =====================================================================
    const translations = {
        de: {
            logo: "Mobin.tutors!",
            nav_about: "Über mich",
            nav_contact: "Kontakt & Buchen",
            nav_imprint: "Impressum",
            hero_title: "Mathe-Nachhilfe online – von der Kanti bis zur ETH",
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
            title: "Mathe-Nachhilfe online – Kanti bis ETH | Mobintutors",
            nav_prices: "Preise",
            nav_faq: "FAQ",
            hero_fact1: "Auf Englisch",
            hero_fact2: "Online via Zoom",
            hero_fact3: "Probelektion 15 CHF",
            prices_title: "Preise",
            price_trial_name: "Probelektion",
            price_trial_amount: "15 CHF",
            price_trial_desc: "Ohne feste Dauer – so lange, wie du brauchst. Ihr lernt euch kennen und schaut deinen Stoff gemeinsam an.",
            price_trial_cta: "Probelektion anfragen",
            price_regular_name: "Lektion",
            price_regular_amount: "35 CHF",
            price_regular_desc: "80 Minuten (1 Std. 20 Min.) Einzelunterricht über Zoom, abgestimmt auf deinen Stoff und deine Prüfungen.",
            price_regular_cta: "Lektion buchen",
            price_note: "Gruppenlektionen sind möglich, ohne Begrenzung der Gruppengrösse. Eine Quittung erhältst du auf Wunsch.",
            testimonials_title: "Das sagen Studierende",
            faq_title: "Häufige Fragen",
            faq_q1: "Für welche Stufen ist der Unterricht?",
            faq_a1: "Für alle Stufen – von der Schule über Gymnasium und Kanti bis zu Fachhochschule, Universität und ETH. Einzige Voraussetzung: Der Unterricht findet auf Englisch statt.",
            faq_q2: "In welcher Sprache findet der Unterricht statt?",
            faq_a2: "Auf Englisch. Deutsche Fachbegriffe aus deinem Skript kann Mobin dir bei Bedarf zuordnen.",
            faq_q3: "Wie läuft eine Lektion über Zoom ab?",
            faq_a3: "Ihr arbeitet gemeinsam auf dem Whiteboard in Zoom. Ideal ist ein Tablet oder Grafikstift, nötig ist das aber nicht. Zoom ist gratis und läuft auch im Browser. Schick deine Unterlagen am besten vorher, dann kann sich Mobin gezielt vorbereiten.",
            faq_q4: "Wann kann ich Lektionen buchen?",
            faq_a4: "Von Montag bis Sonntag zwischen 08:30 und 22:00 Uhr, also auch abends und am Wochenende.",
            faq_q5: "Bekomme ich auch kurzfristig einen Termin?",
            faq_a5: "Das hängt davon ab, wie viele Schülerinnen und Schüler Mobin gerade betreut. Frag am besten so früh wie möglich an, besonders vor Prüfungen.",
            faq_q6: "Sind Gruppenlektionen möglich?",
            faq_a6: "Ja, und es gibt keine Begrenzung bei der Gruppengrösse. Schreib bei der Anfrage einfach, wie viele ihr seid.",
            faq_q7: "Darf ich zwischen den Lektionen Fragen schicken?",
            faq_a7: "Ja, du kannst Mobin auch zwischen den Lektionen Fragen schicken.",
            faq_q8: "Darf ich Lektionen aufnehmen?",
            faq_a8: "Frag Mobin vorher direkt, ob er mit einer Aufnahme einverstanden ist. Unterrichtsmaterialien dürfen in keinem Fall ohne vorherige Absprache weitergegeben werden.",
            faq_q9: "Bekomme ich eine Quittung?",
            faq_a9: "Ja, eine Quittung kannst du jederzeit verlangen.",
            form_privacy: "Mit dem Absenden stimmst du der Verarbeitung deiner Angaben gemäss <a href=\"#privacy\">Datenschutzerklärung</a> zu.",
            footer_imprint: "Impressum",
            footer_privacy: "Datenschutz",
            privacy_title: "Datenschutzerklärung",
            privacy_content: "<h3>Verantwortlich</h3><p>Mobin Ekthiari, Peter-Debye-Weg, 8045 Zürich, mobin.tutors@gmail.com</p>"
                + "<h3>Kontaktformular</h3><p>Wenn du das Kontaktformular nutzt, werden Name, E-Mail-Adresse und Nachricht über den Dienst Formspree (Formspree Inc., USA) an uns übermittelt. Wir verwenden diese Angaben nur, um deine Anfrage zu beantworten und den Unterricht zu organisieren.</p>"
                + "<h3>E-Mail, WhatsApp und Zoom</h3><p>Wenn du uns per E-Mail (Google Gmail) oder WhatsApp (Meta) schreibst oder am Unterricht über Zoom (Zoom Video Communications, USA) teilnimmst, werden deine Daten auch von diesen Anbietern verarbeitet. Es gelten zusätzlich deren Datenschutzbestimmungen.</p>"
                + "<h3>Schriften und Symbole</h3><p>Diese Seite lädt Schriften von Google Fonts (Google) und Symbole über cdnjs (Cloudflare). Dabei wird deine IP-Adresse an diese Anbieter übertragen.</p>"
                + "<h3>Hosting</h3><p>Beim Aufruf der Seite speichert der Webhoster technisch notwendige Daten wie IP-Adresse, Zeitpunkt und Browsertyp in Server-Protokollen.</p>"
                + "<h3>Cookies und Tracking</h3><p>Diese Seite setzt keine eigenen Cookies und verwendet keine Analyse- oder Werbe-Tools.</p>"
                + "<h3>Deine Rechte</h3><p>Du kannst jederzeit Auskunft über deine gespeicherten Daten verlangen sowie deren Berichtigung oder Löschung. Schreib dazu an mobin.tutors@gmail.com. Wir löschen deine Daten, sobald sie nicht mehr benötigt werden.</p>"
                + "<p><em>Stand: Oktober 2026</em></p>",
            footer_text: "&copy; 2026 Mobintutors. Alle Rechte vorbehalten.",
            chatbot_title: "Fragen an den Nachhilfe-Bot",
            chatbot_intro: "Hast du Fragen zum Unterricht, zu den Kosten oder zu freien Zeiten? Frag mich einfach!",
            chatbot_placeholder: "Nachricht eingeben...",
            copy_text: "Kopiert!",
            copy_error: "Kopieren fehlgeschlagen."
        },
        en: {
            logo: "Mobin.tutors!",
            nav_about: "About Me",
            nav_contact: "Contact & Booking",
            nav_imprint: "Imprint",
            hero_title: "Online math tutoring – from high school to ETH",
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
            title: "Online Math Tutoring – High School to ETH | Mobintutors",
            nav_prices: "Prices",
            nav_faq: "FAQ",
            hero_fact1: "In English",
            hero_fact2: "Online via Zoom",
            hero_fact3: "Trial lesson 15 CHF",
            prices_title: "Prices",
            price_trial_name: "Trial lesson",
            price_trial_amount: "15 CHF",
            price_trial_desc: "No fixed length – it takes as long as you need. You get to know each other and look at your material together.",
            price_trial_cta: "Request a trial lesson",
            price_regular_name: "Lesson",
            price_regular_amount: "35 CHF",
            price_regular_desc: "80 minutes (1 h 20 min) of one-on-one tutoring over Zoom, tailored to your material and exams.",
            price_regular_cta: "Book a lesson",
            price_note: "Group lessons are possible, with no limit on group size. You can get a receipt on request.",
            testimonials_title: "What students say",
            faq_title: "Frequently asked questions",
            faq_q1: "Which levels do you teach?",
            faq_a1: "All levels – from school and high school to college, university and ETH. The only requirement is that lessons are held in English.",
            faq_q2: "What language are the lessons in?",
            faq_a2: "English. If needed, Mobin can match the German terms from your lecture notes.",
            faq_q3: "How does a Zoom lesson work?",
            faq_a3: "You work together on the Zoom whiteboard. A tablet or graphics pen is ideal but not required. Zoom is free and also runs in the browser. Send your materials in advance so Mobin can prepare.",
            faq_q4: "When can I book lessons?",
            faq_a4: "Monday to Sunday between 08:30 and 22:00, including evenings and weekends.",
            faq_q5: "Can I get a lesson at short notice?",
            faq_a5: "That depends on how many students Mobin is currently teaching. Get in touch as early as possible, especially before exams.",
            faq_q6: "Are group lessons possible?",
            faq_a6: "Yes, with no limit on group size. Just mention how many of you there are when you get in touch.",
            faq_q7: "Can I send questions between lessons?",
            faq_a7: "Yes, you're welcome to send Mobin questions between lessons.",
            faq_q8: "Can I record lessons?",
            faq_a8: "Ask Mobin directly beforehand whether he agrees to a recording. Lesson materials may never be shared without prior agreement.",
            faq_q9: "Can I get a receipt?",
            faq_a9: "Yes, you can request a receipt at any time.",
            form_privacy: "By sending, you agree to your details being processed as described in the <a href=\"#privacy\">privacy policy</a>.",
            footer_imprint: "Imprint",
            footer_privacy: "Privacy",
            privacy_title: "Privacy policy",
            privacy_content: "<h3>Controller</h3><p>Mobin Ekthiari, Peter-Debye-Weg, 8045 Zürich, Switzerland, mobin.tutors@gmail.com</p>"
                + "<h3>Contact form</h3><p>When you use the contact form, your name, email address and message are sent to us via Formspree (Formspree Inc., USA). We only use this information to answer your request and organise lessons.</p>"
                + "<h3>Email, WhatsApp and Zoom</h3><p>If you contact us by email (Google Gmail) or WhatsApp (Meta), or take part in lessons over Zoom (Zoom Video Communications, USA), your data is also processed by these providers under their own privacy policies.</p>"
                + "<h3>Fonts and icons</h3><p>This site loads fonts from Google Fonts (Google) and icons via cdnjs (Cloudflare). Your IP address is transmitted to these providers in the process.</p>"
                + "<h3>Hosting</h3><p>When you visit the site, the web host stores technically necessary data such as IP address, time and browser type in server logs.</p>"
                + "<h3>Cookies and tracking</h3><p>This site sets no cookies of its own and uses no analytics or advertising tools.</p>"
                + "<h3>Your rights</h3><p>You can request information about your stored data at any time, as well as its correction or deletion, by writing to mobin.tutors@gmail.com. We delete your data as soon as it is no longer needed.</p>"
                + "<p><em>Last updated: October 2026</em></p>",
            footer_text: "&copy; 2026 Mobintutors. All rights reserved.",
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
            if (/imprint_content|footer_text|privacy_content|form_privacy/.test(key)) {
                element.innerHTML = text;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });
        document.title = translations[lang].title;
        document.documentElement.lang = lang;
        applyExtras(lang);
    };

    // Buchungslinks, WhatsApp-Text und Erfahrungsberichte
    function applyExtras(lang) {
        if (SETTINGS.bookingUrl) {
            document.querySelectorAll('.js-book').forEach(link => {
                link.href = SETTINGS.bookingUrl;
                link.target = '_blank';
                link.rel = 'noopener';
            });
        }
        const wa = document.getElementById('whatsapp-link');
        if (wa && SETTINGS.whatsappNumber) {
            wa.href = `https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(SETTINGS.whatsappText[lang])}`;
        }
        const section = document.getElementById('testimonials');
        const list = document.getElementById('testimonials-list');
        if (section && list && SETTINGS.testimonials.length) {
            list.innerHTML = '';
            SETTINGS.testimonials.forEach(t => {
                const fig = document.createElement('figure');
                fig.className = 'testimonial';
                const quote = document.createElement('blockquote');
                quote.textContent = t[lang] || t.de;
                const cap = document.createElement('figcaption');
                cap.textContent = t.detail ? `${t.name}, ${t.detail}` : t.name;
                fig.append(quote, cap);
                list.appendChild(fig);
            });
            section.hidden = false;
        }
    }

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
            en: "Lessons take place online via Zoom using its built-in whiteboard. A tablet or graphics pen is ideal for solving exercises live, but not required. Zoom is free and also works in the browser. If Zoom doesn't work for you, you'll find another solution together."
        },
        {
            id: 'language',
            keywords: ['sprache', 'englisch', 'deutsch', 'sprichst du', 'language', 'english', 'german', 'speak'],
            de: "Der Unterricht findet auf Englisch statt. Fachbegriffe kann Mobin dir bei Bedarf auch auf Deutsch zuordnen.",
            en: "Lessons are held in English."
        },
        {
            id: 'cancel', pausedNote: true,
            keywords: ['absag', 'verschieb', 'stornier', 'krank', 'ausfallen', 'cancel', 'reschedule', 'sick', 'postpone'],
            de: "Wenn du eine Lektion absagen oder verschieben musst, gib bitte so früh wie möglich Bescheid. Die Details besprecht ihr bei der Buchung.",
            en: "If you need to cancel or move a lesson, please let us know as early as possible. Details are agreed on when you book."
        },
        {
            id: 'group',
            keywords: ['gruppe', 'zu zweit', 'zu dritt', 'zu viert', 'mehrere', 'klassenkamerad', 'freund', 'kollege', 'zusammen', 'group', 'together', 'friend', 'classmate'],
            de: "Ja, Gruppenlektionen sind möglich, und es gibt keine Begrenzung bei der Gruppengrösse. Schreib bei der Anfrage einfach, wie viele ihr seid.",
            en: "Yes, group lessons are possible, with no limit on group size. Just mention how many of you there are when you get in touch."
        },
        {
            id: 'materials',
            keywords: ['unterlagen', 'material', 'aufgabe', 'uebung', 'skript', 'hausaufgabe', 'serie', 'homework', 'documents', 'exercise', 'assignment', 'notes'],
            de: "Schick deine Unterlagen (Skript, Übungsserien, alte Prüfungen) am besten vor der Lektion per E-Mail an mobin.tutors@gmail.com. So kann sich Mobin gezielt vorbereiten.",
            en: "Send your materials (lecture notes, problem sets, past exams) by email to mobin.tutors@gmail.com before the lesson so Mobin can prepare."
        },
        {
            id: 'short_notice',
            keywords: ['kurzfristig', 'dringend', 'sofort', 'schnell', 'asap', 'diese woche', 'naechste woche', 'last minute', 'notfall', 'urgent', 'short notice', 'this week', 'next week', 'quickly', 'soon'],
            de: "Ob ein kurzfristiger Termin klappt, hängt davon ab, wie viele Schülerinnen und Schüler Mobin gerade betreut. Frag am besten so früh wie möglich an, dann wird geschaut, was möglich ist.",
            en: "Whether a short-notice lesson works depends on how many students Mobin is currently teaching. Get in touch as early as possible and he'll see what he can do."
        },
        {
            id: 'between_lessons',
            keywords: ['zwischendurch', 'zwischen den lektionen', 'nach der lektion', 'fragen schicken', 'frage schicken', 'fragen stellen', 'kurze frage', 'nachfragen', 'between lessons', 'after the lesson', 'send questions', 'quick question', 'ask questions'],
            de: "Ja, du darfst Mobin auch zwischen den Lektionen Fragen schicken.",
            en: "Yes, you're welcome to send Mobin questions between lessons."
        },
        {
            id: 'recording',
            keywords: ['aufnehm', 'aufnahme', 'aufzeichn', 'filmen', 'mitschnitt', 'teilen', 'weitergeben', 'weiterleiten', 'record', 'recording', 'film', 'share', 'sharing', 'forward'],
            de: "Ob eine Lektion aufgezeichnet werden darf, musst du Mobin direkt fragen, er entscheidet das selbst. Unterrichtsmaterialien dürfen in keinem Fall ohne vorherige Absprache mit anderen geteilt werden.",
            en: "Whether a lesson may be recorded is something you need to ask Mobin directly. Lesson materials may never be shared with others without prior agreement."
        },
        {
            id: 'receipt',
            keywords: ['quittung', 'beleg', 'rechnung', 'bestaetigung', 'eltern', 'receipt', 'invoice', 'proof of payment', 'parents'],
            de: "Ja, eine Quittung kannst du jederzeit verlangen.",
            en: "Yes, you can request a receipt at any time."
        },
        {
            id: 'about', weight: 0.7,
            keywords: ['wer', 'mobin', 'ueber dich', 'ueber ihn', 'erfahrung', 'ausbildung', 'studium', 'qualifik', 'lebenslauf', 'hintergrund', 'who', 'about', 'experience', 'background', 'qualified', 'degree'],
            de: "Mobin hat seinen Bachelor in Mathematik in Urmia mit einem Durchschnitt von 85 % abgeschlossen und galt als bester Student der Fakultät. Deshalb vertrat er sie an Mathematik-Olympiaden. Er hat drei Jahre Unterrichtserfahrung, zuerst als Hilfsassistent in verschiedenen Mathekursen und inzwischen als Online-Tutor, unter anderem für ETH- und Doktoratsstudierende. Sein Ziel ist eine Mathematikprofessur, darum ist Unterrichten für ihn viel mehr als ein Nebenjob. Bisher haben alle seine Schülerinnen und Schüler ihre Matheprüfungen bestanden.",
            en: "Mobin completed his Bachelor's in Mathematics in Urmia with an average of 85% and was considered the top student in the faculty, which is why he represented it at math olympiads. He has three years of teaching experience, first as a teaching assistant in various math courses and now as an online tutor, including ETH and PhD students. He intends to become a math professor, so teaching is much more to him than a side job. So far, all of his students have passed their math exams."
        },
        {
            id: 'contact', pausedNote: true,
            keywords: ['kontakt', 'email', 'mail', 'telefon', 'nummer', 'whatsapp', 'anruf', 'erreichen', 'schreiben', 'contact', 'phone', 'call', 'reach', 'number'],
            de: "Du erreichst uns am einfachsten über das Kontaktformular auf dieser Seite oder per E-Mail an mobin.tutors@gmail.com.",
            en: "The easiest way to reach us is the contact form on this page or by email at mobin.tutors@gmail.com."
        },
        {
            id: 'bot',
            keywords: ['bist du ein bot', 'bist du echt', 'mensch', 'roboter', 'ki', 'chatgpt', 'are you a bot', 'are you human', 'robot', 'ai'],
            de: "Ich bin ein einfacher Info-Bot und kenne die wichtigsten Fakten zum Unterricht. Für alles Persönliche nutze bitte das Kontaktformular.",
            en: "I'm a simple info bot that knows the key facts about the lessons. For anything personal, please use the contact form."
        },
        {
            id: 'help',
            keywords: ['hilfe', 'was kannst du', 'optionen', 'menu', 'help', 'what can you do', 'options'],
            de: "Frag mich zum Beispiel nach Preisen, Fächern, Niveau, Zeiten, der Probestunde, dem Ablauf über Zoom oder nach Mobin selbst.",
            en: "Ask me about prices, subjects, level, times, the trial lesson, how Zoom lessons work, or about Mobin himself."
        },
        {
            id: 'thanks', weight: 0.6,
            keywords: ['danke', 'merci', 'super', 'perfekt', 'toll', 'thanks', 'thank you', 'great', 'perfect', 'cool'],
            de: "Gern geschehen! Wenn du noch etwas wissen möchtest, frag einfach.",
            en: "You're welcome! Just ask if there's anything else."
        },
        {
            id: 'bye', weight: 0.6,
            keywords: ['tschuess', 'ciao', 'adieu', 'auf wiedersehen', 'bis bald', 'bye', 'goodbye', 'see you'],
            de: "Tschüss und viel Erfolg beim Lernen!",
            en: "Bye, and good luck with your studies!"
        }
    ];

    const fallback = {
        de: "Dazu habe ich leider keine Antwort. Probier es mit einem der Themen unten oder schreib deine Frage über das Kontaktformular, dann meldet sich jemand persönlich.",
        en: "I don't have an answer for that. Try one of the topics below, or send your question through the contact form and someone will get back to you personally."
    };

    // Schnellantwort-Knöpfe (Text, der beim Klick gesendet wird)
    const quickReplies = {
        de: ['Preise', 'Fächer', 'Probestunde', 'Zeiten', 'Ablauf', 'Über Mobin'],
        en: ['Prices', 'Subjects', 'Trial lesson', 'Times', 'How it works', 'About Mobin']
    };

    // =====================================================================
    //  CHATBOT – ERKENNUNG
    // =====================================================================

    // Kleinschreibung, Umlaute vereinheitlichen, Satzzeichen entfernen
    const normalize = (text) => text
        .toLowerCase()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Anzahl Tippfehler zwischen zwei Wörtern (Levenshtein-Distanz)
    const editDistance = (a, b) => {
        if (Math.abs(a.length - b.length) > 2) return 99;
        const row = Array.from({ length: b.length + 1 }, (_, i) => i);
        for (let i = 1; i <= a.length; i++) {
            let prev = row[0];
            row[0] = i;
            for (let j = 1; j <= b.length; j++) {
                const temp = row[j];
                row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
                prev = temp;
            }
        }
        return row[b.length];
    };

    // Wie gut passt ein Keyword zur Nachricht? 0 = gar nicht
    const matchKeyword = (keyword, padded, tokens) => {
        if (keyword.includes(' ')) {
            return padded.includes(` ${keyword} `) ? 3 : 0;   // ganze Phrase
        }
        let best = 0;
        for (const token of tokens) {
            if (token === keyword) return 2;                     // exaktes Wort
            if (keyword.length >= 4 && token.startsWith(keyword)) best = Math.max(best, 1.5); // Wortanfang
            const allowed = keyword.length >= 9 ? 2 : keyword.length >= 5 ? 1 : 0;      // Tippfehler
            if (allowed && editDistance(token, keyword) <= allowed) best = Math.max(best, 1);
        }
        return best;
    };

    // Keywords einmalig vorbereiten
    intents.forEach(intent => { intent.normKeywords = intent.keywords.map(normalize); });

    const findIntents = (message) => {
        const norm = normalize(message);
        const tokens = norm.split(' ').filter(Boolean);
        const padded = ` ${norm} `;
        const scored = intents.map(intent => {
            const score = intent.normKeywords.reduce((sum, kw) => sum + matchKeyword(kw, padded, tokens), 0);
            return { intent, score: score * (intent.weight || 1) };
        }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

        if (scored.length === 0) return [];
        // Begrüssung/Danke nur, wenn sonst nichts Inhaltliches gefragt wurde
        const smallTalk = ['greeting', 'thanks', 'bye'];
        const real = scored.filter(r => !smallTalk.includes(r.intent.id));
        if (real.length === 0) return [scored[0].intent];
        // Bis zu zwei Themen beantworten, z.B. "Was kostet es und wann geht es?"
        const result = [real[0].intent];
        if (real[1] && real[1].score >= 1.5) result.push(real[1].intent);
        return result;
    };

    const buildAnswer = (message, lang) => {
        const found = findIntents(message);
        if (found.length === 0) return { text: fallback[lang], isFallback: true };
        const parts = found.map(intent => {
            const answer = intent[lang] || intent.de;
            return typeof answer === 'function' ? answer() : answer;
        });
        const needsNote = SETTINGS.paused && found.some(i => i.pausedNote);
        if (needsNote) parts.push(SETTINGS.pausedNote[lang]);
        return { text: parts.join('\n\n'), isFallback: false };
    };

    // =====================================================================
    //  CHATBOT – OBERFLÄCHE
    // =====================================================================
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-btn');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    if (!chatbotIcon || !chatbotWindow || !messagesContainer || !userInput || !sendBtn) return;

    // Kleine Zusatz-Styles, damit du die CSS-Datei nicht anpassen musst
    const style = document.createElement('style');
    style.textContent = `
        #chatbot-messages .bot-message { white-space: pre-line; }
        .mt-quick-replies { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
        .mt-quick-replies button {
            font: inherit; font-size: 0.85em; padding: 5px 11px; cursor: pointer;
            border: 1px solid currentColor; border-radius: 999px;
            background: transparent; color: inherit; opacity: 0.85;
        }
        .mt-quick-replies button:hover, .mt-quick-replies button:focus-visible { opacity: 1; outline: 2px solid currentColor; outline-offset: 1px; }
    `;
    document.head.appendChild(style);

    let fallbackCount = 0;

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        div.textContent = text; // textContent schützt vor eingeschleustem HTML
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    function renderQuickReplies() {
        if (!messagesContainer) return;
        messagesContainer.querySelectorAll('.mt-quick-replies').forEach(el => el.remove());
        const wrap = document.createElement('div');
        wrap.className = 'mt-quick-replies';
        quickReplies[getLang()].forEach(label => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = label;
            btn.addEventListener('click', () => sendMessage(label));
            wrap.appendChild(btn);
        });
        messagesContainer.appendChild(wrap);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    const sendMessage = (presetText) => {
        const raw = (typeof presetText === 'string' ? presetText : userInput.value).trim();
        if (raw === '') return;
        userInput.value = '';

        messagesContainer.querySelectorAll('.mt-quick-replies').forEach(el => el.remove());
        addMessage(raw, 'user');

        setTimeout(() => {
            const lang = getLang();
            const { text, isFallback } = buildAnswer(raw, lang);
            fallbackCount = isFallback ? fallbackCount + 1 : 0;
            addMessage(text, 'bot');
            // Bei Unklarheiten Themen-Knöpfe zeigen
            if (isFallback) renderQuickReplies();
        }, SETTINGS.replyDelay);
    };

    // ----- Blinzeln -----
    // Hat das Symbol Augen mit der Klasse "eye", blinzeln nur diese.
    // Sonst blinzelt das ganze Symbol mit einem kurzen Zusammenziehen.
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes mt-blink-eye  { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
        @keyframes mt-blink-icon { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.82); } }
        #chatbot-icon .eye { transform-box: fill-box; transform-origin: center; }
        #chatbot-icon.mt-blink .eye { animation: mt-blink-eye 0.16s ease-in-out; }
        #chatbot-icon.mt-blink.mt-no-eyes { animation: mt-blink-icon 0.16s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
            #chatbot-icon.mt-blink .eye, #chatbot-icon.mt-blink.mt-no-eyes { animation: none; }
        }
    `;
    document.head.appendChild(blinkStyle);

    const blinkOnce = () => new Promise(resolve => {
        chatbotIcon.classList.toggle('mt-no-eyes', !chatbotIcon.querySelector('.eye'));
        chatbotIcon.classList.remove('mt-blink');
        void chatbotIcon.offsetWidth; // Animation neu starten
        chatbotIcon.classList.add('mt-blink');
        setTimeout(() => { chatbotIcon.classList.remove('mt-blink'); resolve(); }, 180);
    });

    const scheduleBlink = () => {
        const [min, max] = SETTINGS.blinkEvery;
        const wait = (min + Math.random() * (max - min)) * 1000;
        setTimeout(async () => {
            // Nicht blinzeln, solange das Chatfenster offen ist
            if (!chatbotWindow.classList.contains('visible')) {
                await blinkOnce();
                if (Math.random() < 0.25) { // manchmal doppelt blinzeln
                    await new Promise(r => setTimeout(r, 120));
                    await blinkOnce();
                }
            }
            scheduleBlink();
        }, wait);
    };
    if (SETTINGS.blink) scheduleBlink();

    let opened = false;
    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.classList.toggle('visible');
        if (!opened && chatbotWindow.classList.contains('visible')) {
            opened = true;
            renderQuickReplies();
            setTimeout(() => userInput.focus(), 100);
        }
    });
    chatbotIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chatbotIcon.click(); }
    });
    if (closeBtn) closeBtn.addEventListener('click', () => chatbotWindow.classList.remove('visible'));

    sendBtn.addEventListener('click', () => sendMessage());
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.isComposing) {
            event.preventDefault();
            sendMessage();
        }
    });
});
