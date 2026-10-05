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
    // ================
