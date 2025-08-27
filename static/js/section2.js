// Fonction pour passer de la page d'accueil au quiz
function startQuizPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    startQuiz();
}

// Fonction pour revenir à la page d'accueil
function goBackToHome() {
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("home-page").style.display = "flex";
}

// Code du quiz
const questions = [
    { q: "Quelle est la capitale de la France ?", answers: ["Egypte", "Madagascar", "Paris"], correct: 2 },
    { q: "Quel est le but de la responsabilité ?", answers: ["Mauvaise action", "Bien-être", "Plaisir"], correct: 1 },
    { q: "Le ciel est de quelle couleur ?", answers: ["Bleu", "Rouge", "Vert"], correct: 0 },
    { q: "Combien de jours dans une semaine ?", answers: ["5", "7", "10"], correct: 1 },
    { q: "Quelle est la capitale de Madagascar ?", answers: ["Tamatave", "Majunga", "Antananarivo"], correct: 2 }
];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let isGameMode = true;

// Fonction pour lancer les confettis "plof"
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${3 + Math.random() * 3}s linear forwards`;
        container.appendChild(confetti);
    }
}

// Animation CSS pour les confettis
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% { transform: translateY(-10vh) translateX(0); opacity: 1; }
        100% { transform: translateY(110vh) translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Démarrer le quiz
function startQuiz() {
    document.getElementById("result-content").classList.remove("active");
    document.querySelector(".question-container").style.display = "block";
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// Retour à l'accueil
function goBack() {
    if (!isGameMode) {
        startQuiz();
    }
}

// Charger une question
function loadQuestion() {
    isGameMode = true;
    document.getElementById("result-content").classList.remove("active");
    document.querySelector(".question-container").style.display = "block";
    document.getElementById("answers").style.display = "flex";
    document.getElementById("validate-btn").style.display = "none";
    const q = questions[currentQuestion];
    document.getElementById("question-number").textContent = currentQuestion + 1;
    document.getElementById("question").textContent = q.q;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    ["A", "B", "C"].forEach((letter, index) => {
        if (q.answers[index]) {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.innerHTML = `<div class="answer-letter">${letter}</div><div>${q.answers[index]}</div>`;
            btn.onclick = () => selectAnswer(btn, index);
            answersDiv.appendChild(btn);
        }
    });
    selectedAnswer = null;
}

// Sélectionner une réponse
function selectAnswer(button, index) {
    document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedAnswer = index;
    document.getElementById("validate-btn").style.display = "block";
}

// Valider la réponse
function validateAnswer() {
    if (selectedAnswer === null) {
        alert('Veuillez sélectionner une réponse');
        return;
    }
    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 500);
    } else {
        setTimeout(endQuiz, 500);
    }
}

// Fin du quiz
function endQuiz() {
    isGameMode = false;
    document.querySelector(".question-container").style.display = "none";
    document.getElementById("result-content").classList.add("active");
    const resultMessage = document.getElementById("result-message");
    const scoreDisplay = document.getElementById("score-display");
    const responsibilityMessage = document.getElementById("responsibility-message");
    scoreDisplay.textContent = `Ton score : ${score}/${questions.length}`;
    if (score >= 3) {
        launchConfetti();
        resultMessage.innerHTML = `<div class="wow-text">Félicitations ! 🎉 Vous avez réussi !</div>`;
        responsibilityMessage.textContent = "Vous êtes responsable";
        document.getElementById("nextlevel-btn").style.display = "block";
        document.getElementById("restart-btn").style.display = "none";
    } else {
        resultMessage.innerHTML = `<div class="oh-non-text">Dommage... 😢 Essayez encore !</div>`;
        responsibilityMessage.textContent = "Vous êtes irresponsable";
        document.getElementById("restart-btn").style.display = "block";
        document.getElementById("nextlevel-btn").style.display = "none";
    }
}

// Recommencer le quiz
function restartQuiz() {
    document.getElementById("result-content").classList.remove("active");
    startQuiz();
}

// Niveau suivant
function nextLevel() {
    alert("🎉 Bravo ! Tu passes au niveau suivant 🎉!");
}
