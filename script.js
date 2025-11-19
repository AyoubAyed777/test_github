let ncB = document.getElementById('nc');
let nomchat = document.getElementById('nomnc');
let historique = document.getElementById('history');
let nomact = '';

const chatDiv = document.getElementById('chat');
const form = document.querySelector('form');
const msgInput = document.getElementById('msg');

/* ----------  Chargement au démarrage  ---------- */
window.addEventListener('DOMContentLoaded', () => {
    const sauvegardes = JSON.parse(localStorage.getItem('chats')) || [];
    sauvegardes.forEach(nom => ajouterHistorique(nom));

    // Si un chat est déjà actif, le charger
    const dernierChat = localStorage.getItem('dernierChat');
    if (dernierChat) {
        nomact = dernierChat;
        document.querySelector('header').textContent = nomact;
        chargerMessages();
    }
});

/* ----------  Nouveau chat  ---------- */
ncB.addEventListener('click', () => {
    ncB.style.display = 'none';
    nomchat.style.display = 'block';
    nomchat.focus();
});

nomchat.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const nn = nomchat.value.trim();
        if (!nn) return;

        if (nomact) {
            ajouterHistorique(nomact);
            const sauvegardes = JSON.parse(localStorage.getItem('chats')) || [];
            if (!sauvegardes.includes(nomact)) {
                sauvegardes.push(nomact);
                localStorage.setItem('chats', JSON.stringify(sauvegardes));
            }
        }

        nomact = nn;
        localStorage.setItem('dernierChat', nomact);
        document.querySelector('header').textContent = nn;
        nomchat.value = '';
        nomchat.style.display = 'none';
        ncB.style.display = 'block';

        // Message de bienvenue du bot
        ajouterMessageBot(`Bonjour ! Bienvenue dans le chat ${nn}.`);
        sauvegarderMessage(nomact, `Bonjour ! Bienvenue dans le chat ${nn}.`, 'bot');
    }
});

/* ----------  Ajouter à l’historique  ---------- */
function ajouterHistorique(nom) {
    const li = document.createElement('li');
    li.style.cursor = 'pointer';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.marginBottom = '4px';

    const span = document.createElement('span');
    span.textContent = nom;
    span.style.flexGrow = '1';

    const btnSupp = document.createElement('button');
    btnSupp.textContent = '×';
    btnSupp.style.border = 'none';
    btnSupp.style.background = 'transparent';
    btnSupp.style.color = 'red';
    btnSupp.style.cursor = 'pointer';

    span.addEventListener('click', () => {
        nomact = nom;
        localStorage.setItem('dernierChat', nomact);
        document.querySelector('header').textContent = nom;
        chargerMessages();
    });

    btnSupp.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        let sauvegardes = JSON.parse(localStorage.getItem('chats')) || [];
        sauvegardes = sauvegardes.filter(n => n !== nom);
        localStorage.setItem('chats', JSON.stringify(sauvegardes));

        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages = messages.filter(m => m.chat !== nom);
        localStorage.setItem('messages', JSON.stringify(messages));

        if (nomact === nom) {
            nomact = '';
            localStorage.removeItem('dernierChat');
            document.querySelector('header').textContent = 'Nom du chat';
            chatDiv.innerHTML = '';
        }
    });

    li.appendChild(span);
    li.appendChild(btnSupp);
    historique.appendChild(li);
}

/* ----------  Sauvegarder un message  ---------- */
function sauvegarderMessage(chat, texte, auteur) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ chat, texte, auteur });
    localStorage.setItem('messages', JSON.stringify(messages));
}

/* ----------  Afficher un message  ---------- */
function afficherMessage(texte, auteur) {
    const div = document.createElement('div');
    div.classList.add('message', auteur);
    div.textContent = texte;
    chatDiv.appendChild(div);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function ajouterMessageBot(texte) {
    afficherMessage(texte, 'bot');
}

/* ----------  Charger les messages  ---------- */
function chargerMessages() {
    chatDiv.innerHTML = '';
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesChat = messages.filter(m => m.chat === nomact);
    messagesChat.forEach(m => afficherMessage(m.texte, m.auteur));
}

/* ----------  Envoyer un message  ---------- */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texte = msgInput.value.trim();
    if (!texte || !nomact) return;

    afficherMessage(texte, 'user');
    sauvegarderMessage(nomact, texte, 'user');

    // Réponse simulée du bot
    setTimeout(() => {
        const reponse = `Tu as dit : "${texte}"`;
        afficherMessage(reponse, 'bot');
        sauvegarderMessage(nomact, reponse, 'bot');
    }, 1000);

    msgInput.value = '';
});