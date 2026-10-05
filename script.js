document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    //  EINSTELLUNGEN – hier kannst du den Bot ohne Programmierkenntnisse anpassen
    // =====================================================================
    const SETTINGS = {
        // true = Mobin ist gerade nicht erreichbar. Buchungs- und Kontaktantworten
        // bekommen dann automatisch den Hinweis unten angehängt.
        paused: true,
        pausedNote: {
            de: "Hinweis: Mobin ist wegen der aktuellen Lage in seinem Land vorübergehend nicht erreichbar. Neue Anfragen nimmt Rahel über das Kontaktformular auf dieser Seite entgegen.",
            en: "Note: Due to the current situation in his country, Mobin is temporarily unreachable. Rahel is handling new requests through the contact form on this page."
        },
        replyDelay: 450 // Millisekunden, bis der Bot antwortet
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
            about_text1: "Ich bin ein leidenschaftlicher Nachhilfelehrer mit zwei Jahren Erfahrung in der Vermittlung verschiedener Mathematikfächer. Mein Ziel ist es, nicht nur Wissen zu vermitteln, sondern auch das Selbstvertrauen meiner Schülerinnen und Schüler zu stärken. Ich glaube daran, dass jeder lernen kann, wenn er die richtige Unterstützung erhält.",
            about_text2: "In meinen Stunden gehe ich auf deine individuellen Bedürfnisse ein und erstelle massgeschneiderte Lernpläne. Gemeinsam überwinden wir Schwierigkeiten und machen das Lernen zu einem positiven Erlebnis. Ob Algebra, Analysis, diskrete Mathematik oder ein anderes Mathematikfach – ich helfe dir, deine Ziele zu erreichen.",
            about_text3: "Der Unterricht findet auf Englisch über Zoom statt und kann von Montag bis Sonntag zwischen 08:30 und 22:00 Uhr gebucht werden. Die Probelektion kostet 15 CHF, danach 25 CHF pro Stunde. Der Unterricht richtet sich an Schüler und Studierende auf Gymnasial-, Hochschul- und ETH-Niveau.",
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
            imprint_content1: "Rahel Zinga<br>Peter-Debye-Weg<br>8045 Zürich",
            imprint_content2: "Verantwortlich für den Inhalt:",
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
            about_text1: "I'm a passionate mathematics graduate with two years of experience as a teaching assistant, and I recently moved into online tutoring. My goal is not just to pass on knowledge but to strengthen my students' confidence. I believe everyone can learn with the right support.",
            about_text2: "In my sessions, I focus on your individual needs and create customized learning plans. Together, we overcome challenges and make learning a positive experience. Whether it's algebra, calculus, discrete math or another area of mathematics, I'm here to help you reach your goals.",
            about_text3: "Sessions are held in English over Zoom and can be booked Monday to Sunday from 08:30 to 22:00. The trial lesson costs 15 CHF, and regular lessons cost 25 CHF per hour. Sessions are aimed at high school, college, university and ETH students.",
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
            imprint_content1: "Rahel Zinga<br>Peter-Debye-Weg<br>8045 Zürich",
            imprint_content2: "Responsible for the content:",
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

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting));
    }, { threshold: 0.1 });
    document.querySelectorAll('.page-section').forEach(section => observer.observe(section));

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
            de: "Die Probelektion kostet 15 CHF. Danach kostet jede Lektion 25 CHF pro Stunde.",
            en: "The trial lesson costs 15 CHF. After that, each lesson costs 25 CHF per hour."
        },
        {
            id: 'payment',
            keywords: ['bezahl', 'zahl', 'twint', 'bar', 'ueberweis', 'rechnung', 'paypal', 'karte', 'pay', 'payment', 'invoice', 'card', 'cash'],
            de: "Die Zahlungsart wird bei der Buchung direkt abgesprochen. Schreib einfach über das Kontaktformular, welche Variante dir am besten passt.",
            en: "The payment method is agreed on directly when you book. Just mention your preferred option in the contact form."
        },
        {
            id: 'trial', pausedNote: true,
            keywords: ['probe', 'schnupper', 'kennenlern', 'erste stunde', 'erste lektion', 'gratis', 'kostenlos', 'trial', 'first lesson', 'test lesson', 'free lesson'],
            de: "Die Probelektion kostet 15 CHF. Dabei lernt ihr euch kennen, Mobin schaut sich deinen Stoff an und ihr legt gemeinsam einen Plan fest. Anfragen kannst du sie über den Knopf «Probestunde anfragen» oder das Kontaktformular.",
            en: "The trial lesson costs 15 CHF. You get to know each other, Mobin looks at your material, and together you set a plan. You can request it with the «Request a trial lesson» button or the contact form."
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
            id: 'level',
            keywords: ['niveau', 'stufe', 'gymi', 'gymnasium', 'kanti', 'kantonsschule', 'matura', 'uni', 'universitaet', 'eth', 'epfl', 'fh', 'fachhochschule', 'hochschule', 'bachelor', 'master', 'phd', 'doktor', 'sek', 'oberstufe', 'primar', 'klasse', 'level', 'high school', 'college', 'university', 'grade'],
            de: "Der Unterricht richtet sich vor allem an Gymnasium/Kanti, Fachhochschule, Universität und ETH. Mobin hat auch schon ETH- und Doktoratsstudierende begleitet. Für jüngere Schülerinnen und Schüler frag am besten kurz nach.",
            en: "Lessons are aimed mainly at high school, college, university and ETH level. Mobin has also tutored ETH and PhD students. For younger students, just send a quick question."
        },
        {
            id: 'exam',
            keywords: ['pruefung', 'basispruefung', 'klausur', 'test', 'vorbereit', 'lernplan', 'durchgefallen', 'nachpruefung', 'exam', 'midterm', 'final', 'prepare', 'preparation', 'failed'],
            de: "Prüfungsvorbereitung ist ein Schwerpunkt. Mobin erstellt dir einen Lernplan, geht alte Prüfungen mit dir durch und übt gezielt deine Schwachstellen. Je früher du dich meldest, desto besser lässt sich planen.",
            en: "Exam preparation is a key focus. Mobin creates a study plan, works through past exams with you and targets your weak spots. The earlier you get in touch, the better you can plan."
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
            de: "Eine reguläre Lektion dauert 60 Minuten. Wenn du kürzere oder längere Einheiten brauchst, lässt sich das absprechen.",
            en: "A regular lesson lasts 60 minutes. Shorter or longer sessions can be arranged."
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
            keywords: ['gruppe', 'zu zweit', 'zu dritt', 'freund', 'kollege', 'zusammen', 'group', 'together', 'friend', 'classmate'],
            de: "Lektionen zu zweit oder in kleinen Gruppen sind auf Anfrage möglich. Schreib einfach, wie viele ihr seid.",
            en: "Lessons for two or small groups are possible on request. Just tell us how many of you there are."
        },
        {
            id: 'materials',
            keywords: ['unterlagen', 'material', 'aufgabe', 'uebung', 'skript', 'hausaufgabe', 'serie', 'schicken', 'senden', 'homework', 'documents', 'exercise', 'assignment', 'notes', 'send'],
            de: "Schick deine Unterlagen (Skript, Übungsserien, alte Prüfungen) am besten vor der Lektion per E-Mail an mobin.tutors@gmail.com. So kann sich Mobin gezielt vorbereiten.",
            en: "Send your materials (lecture notes, problem sets, past exams) by email to mobin.tutors@gmail.com before the lesson so Mobin can prepare."
        },
        {
            id: 'about', weight: 0.7,
            keywords: ['wer', 'mobin', 'ueber dich', 'ueber ihn', 'erfahrung', 'ausbildung', 'studium', 'qualifik', 'lebenslauf', 'hintergrund', 'who', 'about', 'experience', 'background', 'qualified', 'degree'],
            de: "Mobin hat seinen Bachelor in Mathematik in Urmia mit einem Durchschnitt von 85 % abgeschlossen und galt als bester Student der Fakultät. Deshalb vertrat er sie an Mathematik-Olympiaden. Er arbeitete als Hilfsassistent in verschiedenen Mathekursen und unterrichtet inzwischen online, unter anderem ETH- und Doktoratsstudierende. Sein Ziel ist eine Mathematikprofessur, darum ist Unterrichten für ihn viel mehr als ein Nebenjob.",
            en: "Mobin completed his Bachelor's in Mathematics in Urmia with an average of 85% and was considered the top student in the faculty, which is why he represented it at math olympiads. He worked as a teaching assistant in various math courses and now tutors online, including ETH and PhD students. He intends to become a math professor, so teaching is much more to him than a side job."
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

    let opened = false;
    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.classList.toggle('visible');
        if (!opened && chatbotWindow.classList.contains('visible')) {
            opened = true;
            renderQuickReplies();
            setTimeout(() => userInput.focus(), 100);
        }
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
