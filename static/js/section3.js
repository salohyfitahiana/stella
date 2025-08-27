document.addEventListener('DOMContentLoaded', function () {
    // ----------------------
    // Sélection des éléments DOM
    // ----------------------
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const level2Screen = document.getElementById('level2-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const quizBack = document.getElementById('quiz-back');
    const resultBack = document.getElementById('result-back');
    const level2Back = document.getElementById('level2-back');
    const level2BackBtn = document.getElementById('level2-back-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const finalScore = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');
    const nextLevel = document.getElementById('next-level');
    const gameScoreText = document.getElementById('gameScore');
    const timekeeper = document.getElementById('timekeeper');

    // ----------------------
    // Quiz – logique (Niveau 1)
    // ----------------------
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    const questionBank = [
        { question: "Que signifie 'trier les déchets' ?", options: ["Les mélanger", "Les séparer selon leur type", "Les enterrer"], correctIndex: 1 },
        { question: "Pourquoi trier les déchets ?", options: ["Pour polluer plus", "Pour recycler et protéger la nature", "Pour décorer la maison"], correctIndex: 1 },
        { question: "Quel objet peut-on réutiliser ?", options: ["Sac en tissu", "Canette jetée", "Papier sale"], correctIndex: 0 },
        { question: "Quelle est la couleur habituelle des poubelles de recyclage plastique ?", options: ["Jaune", "Rouge", "Bleu"], correctIndex: 0 },
        { question: "Que faire avec du papier encore propre ?", options: ["Le jeter", "Le réutiliser", "Le brûler"], correctIndex: 1 },
        { question: "Pourquoi les déchets plastiques sont dangereux ?", options: ["Ils se décomposent très vite", "Ils polluent longtemps et blessent les animaux", "Ils nourrissent les plantes"], correctIndex: 1 },
        { question: "Que faire des vieux vêtements abîmés ?", options: ["Les jeter n’importe où", "Les recycler ou les transformer", "Les laisser dehors"], correctIndex: 1 },
        { question: "Quel est l’avantage du compostage ?", options: ["Nourrir le sol naturellement", "Créer des déchets en plus", "Produire du plastique"], correctIndex: 0 },
        { question: "Vrai ou Faux : Recycler aide à économiser les ressources naturelles.", options: ["Vrai", "Faux"], correctIndex: 0 },
        { question: "Dans quelle poubelle mettre du verre cassé ?", options: ["Recyclage verre", "Compost", "Plastique"], correctIndex: 0 },
        { question: "Que mettre dans un compost ?", options: ["Restes de légumes, feuilles", "Plastique", "Verre cassé"], correctIndex: 0 },
        { question: "Dans quelle poubelle mettre les bouteilles en plastique ?", options: ["Poubelle recyclage", "Poubelle compost", "Poubelle ordinaire"], correctIndex: 0 },
        { question: "Quel type de déchet peut être recyclé ?", options: ["Plastique, papier, métal", "Terre, sable", "Eau sale"], correctIndex: 0 },
        { question: "Vrai ou Faux : On peut mettre des piles usées dans la nature.", options: ["Vrai", "Faux"], correctIndex: 1 },
        { question: "Le compostage permet de recycler quels déchets ?", options: ["Déchets alimentaires et déchets de jardin", "Plastique et métal", "Verre et piles"], correctIndex: 0 },
        { question: "Le verre peut être recyclé indéfiniment ?", options: ["Vrai", "Faux"], correctIndex: 0 },
        { question: "Quel geste évite le gaspillage alimentaire ?", options: ["Planifier les repas et conserver correctement les aliments", "Jeter les restes", "Acheter plus que nécessaire"], correctIndex: 0 },
        { question: "Quelle action réduit le poids des déchets plastiques à la source ?", options: ["Utiliser des produits avec sacs réutilisables et éviter les emballages superflus", "Acheter beaucoup de plastique", "Brûler les déchets"], correctIndex: 0 },
        { question: "Quel matériau est le plus facile à recycler ?", options: ["Le verre", "Le plastique", "Le papier sale"], correctIndex: 0 }
    ];

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);
    quizBack.addEventListener('click', () => showScreen(startScreen));
    resultBack.addEventListener('click', () => showScreen(quizScreen));
    level2Back.addEventListener('click', () => showScreen(resultScreen));
    level2BackBtn.addEventListener('click', () => showScreen(resultScreen));

    nextLevel.addEventListener('click', () => {
        if (score >= 3) {
            startLevel2();
        }
    });

    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        currentQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 5);
        showScreen(quizScreen);
        showQuestion();
    }

    function showQuestion() {
        selectedOption = null;
        const current = currentQuestions[currentQuestionIndex];
        questionText.textContent = current.question;
        optionsContainer.innerHTML = '';
        current.options.forEach((option, index) => {
            const opt = document.createElement('div');
            opt.classList.add('option');
            opt.textContent = option;
            opt.dataset.index = index;
            opt.addEventListener('click', selectOption);
            optionsContainer.appendChild(opt);
        });
        updateProgressBar();
    }

    function selectOption(e) {
        const opt = e.target;
        if (selectedOption !== null) return;
        selectedOption = parseInt(opt.dataset.index);
        opt.classList.add('selected');
        setTimeout(checkAnswer, 500);
    }

    function checkAnswer() {
        const correct = currentQuestions[currentQuestionIndex].correctIndex;
        if (selectedOption === correct) score++;
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        showScreen(resultScreen);
        finalScore.textContent = `${score} / ${currentQuestions.length}`;
        if (score >= 3) {
            resultMessage.textContent = "Félicitations ! Vous passez au niveau 2.";
            resultMessage.className = "message success";
            nextLevel.style.display = "block";
            launchConfetti();
        } else {
            resultMessage.textContent = "Vous devez obtenir au moins 3 bonnes réponses.";
            resultMessage.className = "message failure";
            nextLevel.style.display = "none";
        }
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / currentQuestions.length) * 100;
        progressBarFill.style.width = `${progress}%`;
    }

    function showScreen(screen) {
        [startScreen, quizScreen, resultScreen, level2Screen].forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // ----------------------
    // Niveau 2 – Jeu mascotte + chrono
    // ----------------------
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // mascotte
    const mascotImg = new Image();
    mascotImg.src = "/static/images/m2.png";
    let mascot = { x: 250, y: 300, w: 80, h: 80, speed: 5 };

    // poubelles avec images
    const binImages = {
        plastique: new Image(),
        verre: new Image(),
        papier: new Image()
    };
    binImages.plastique.src = "/static/images/poubelle_jaune.png";
    binImages.verre.src = "/static/images/poubelle_verte.png";
    binImages.papier.src = "/static/images/poubelle_bleu.png";

    let bins = [
        { type: "plastique", x: 80, y: 330, w: 80, h: 80 },
        { type: "verre", x: 250, y: 330, w: 80, h: 80 },
        { type: "papier", x: 420, y: 330, w: 80, h: 80 }
    ];

    // déchets avec images
    const trashImages = [
        { type: "plastique", src: "/static/images/dechet_bouteille.png" },
        { type: "plastique", src: "/static/images/dechet_sachet.png" },
        { type: "papier", src: "/static/images/dechet_papier.png" },
        { type: "papier", src: "/static/images/dechet_carton.png" },
        { type: "verre", src: "/static/images/dechet_banane.png" },
        { type: "verre", src: "/static/images/dechet_orange.png" }
    ];
    trashImages.forEach(img => {
        const i = new Image();
        i.src = img.src;
        img.image = i;
    });

    let trashItems = [];
    let level2Score = 0;
    let keys = {};
    let carriedTrash = null;
    let timerInterval;
    let timeLeft = 60;

    window.addEventListener("keydown", e => keys[e.key] = true);
    window.addEventListener("keyup", e => keys[e.key] = false);

    function startLevel2() {
        level2Score = 0;
        trashItems = [];
        carriedTrash = null;
        mascot.x = 250;
        mascot.y = 300;
        showScreen(level2Screen);
        spawnTrash();

        timeLeft = 60;
        updateTimerDisplay();

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endLevel2();
            }
        }, 1000);

        requestAnimationFrame(updateGame);
    }

    function updateTimerDisplay() {
        if (timekeeper) timekeeper.textContent = "Temps : " + timeLeft + "s";
    }

    function endLevel2() {
        alert("Temps écoulé ! Votre score est de : " + level2Score);
        showScreen(resultScreen);
    }

    function spawnTrash() {
        const candidates = ["plastique", "verre", "papier"];
        const type = candidates[Math.floor(Math.random() * candidates.length)];
        const possibleImgs = trashImages.filter(t => t.type === type);
        const chosenImg = possibleImgs[Math.floor(Math.random() * possibleImgs.length)];
        trashItems.push({
            type,
            img: chosenImg.image,
            x: Math.random() * (canvas.width - 30),
            y: 0,
            w: 40,
            h: 40,
            speed: 2
        });
        setTimeout(spawnTrash, 2000);
    }

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Déplacement mascotte
        if (keys["ArrowLeft"] && mascot.x > 0) mascot.x -= mascot.speed;
        if (keys["ArrowRight"] && mascot.x < canvas.width - mascot.w) mascot.x += mascot.speed;
        if (keys["ArrowUp"] && mascot.y > 0) mascot.y -= mascot.speed;
        if (keys["ArrowDown"] && mascot.y < canvas.height - mascot.h) mascot.y += mascot.speed;

        if (mascotImg.complete) ctx.drawImage(mascotImg, mascot.x, mascot.y, mascot.w, mascot.h);

        // Poubelles
        bins.forEach(bin => {
            if (binImages[bin.type].complete) {
                ctx.drawImage(binImages[bin.type], bin.x, bin.y, bin.w, bin.h);
            }
        });

        // Déchets
        if (!carriedTrash) {
            trashItems.forEach((trash, i) => {
                trash.y += trash.speed;
                if (trash.img.complete) ctx.drawImage(trash.img, trash.x, trash.y, trash.w, trash.h);

                if (isColliding(mascot, trash)) {
                    carriedTrash = trash;
                    trashItems.splice(i, 1);
                }

                if (trash.y > canvas.height) trashItems.splice(i, 1);
            });
        } else {
            if (carriedTrash.img.complete) {
                ctx.drawImage(carriedTrash.img, mascot.x + mascot.w + 5, mascot.y, 30, 30);
            }

            bins.forEach(bin => {
                if (isColliding(mascot, bin)) {
                    if (carriedTrash.type === bin.type) {
                        level2Score += 10;
                    } else {
                        level2Score -= 5;
                    }
                    carriedTrash = null;
                }
            });
        }

        gameScoreText.textContent = "Score : " + level2Score;

        if (timeLeft > 0) requestAnimationFrame(updateGame);
    }

    function isColliding(a, b) {
        return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
        );
    }

    // 🎉 Confettis
    function launchConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const overlayRect = resultScreen.getBoundingClientRect();
            const startX = overlayRect.left + Math.random() * overlayRect.width;
            const startY = overlayRect.top + Math.random() * overlayRect.height;
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            confetti.style.setProperty('--dx', (Math.random() - 0.5) * 2);
            confetti.style.setProperty('--dy', (Math.random() - 0.5) * 2);
            confetti.style.setProperty('--rot', `${Math.random() * 720}deg`);
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            const colors = ['#4CAF50', '#388E3C', '#FFC107'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    // 👋 Démarrer sur l’écran d’accueil
    showScreen(startScreen);
});
