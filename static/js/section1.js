const questionsSet1=[{id:1,
question:'Que signifie "consommer de façon responsable"?',
options:['a) Acheter le plus possible','b) Utiliser ce dont on a besoin et éviter le gaspillage','c) Tout jeter après usage'],
answer:'b) Utiliser ce dont on a besoin et éviter le gaspillage'},{id:2,
question:'Pourquoi fat-il eteindre la lumiere en quitter une gaspillage ?',
options:['a) Pour economiser electricité','b) Pour eviter la pousiere','c) Pour chauffer la piece',],
answer:'a) Pour economiser electricité'},{id:3,
question:"Quel est la meilleur moment pour arroser les plantes ?",
options:['a) En plein midi','b) Le matin ou soir','c) Pendant la pluie'],
answer:'b) Se matin ou soir'},{id:4,
question:'Si ton telephone est charge 100% que dois-tu faire ?',
options:['a) Le laisser branché','b) Le debrancher','c) Le mettre au soleil'],
answer:'b) Le debrancher'},{id:5,
question:"Quel geste simple simple economise de l'eau ?",
options:['a) Se brosser les dents avec le robinet ouvert','b) Se brosser le dents en fermant le robinet ','c) Utilser un tuyau d arrosage en permanence',],
answer:'b) Se brosser le dents en fermant le robinet '}];

let currentQuiz=1;let questions=[...questionsSet1];let currentQuestionIndex=0;let score=0;let selectedAnswer=null;let confettiAnimation;

function displayQuestion(){const q=questions[currentQuestionIndex];document.getElementById('question-number').
textContent=`${currentQuestionIndex+1}-`;document.getElementById('question-text').textContent=q.question;const
 box=document.getElementById('options-container');box.innerHTML='';selectedAnswer=null;document.getElementById
 ('validate-button').disabled=true;q.options.forEach
(option=>{const btn=document.createElement('button');btn.className='option';btn.textContent=option;btn.onclick=()=>
selectAnswer(btn,option);box.appendChild(btn);});}

function selectAnswer(el,answer){document.querySelectorAll('.option').forEach(b=>b.classList.remove('selected'));
el.classList.add('selected');selectedAnswer=answer;document.getElementById('validate-button').disabled=false;}

function validateAnswer(){if(!selectedAnswer)return;const correct=questions[currentQuestionIndex].answer;if
(selectedAnswer===correct){score++;}if(currentQuestionIndex<questions.length-1){currentQuestionIndex++;
setTimeout(displayQuestion,250);}else{setTimeout(()=>{
  // NANAMPY: Mampiseho result page araka ny score
  showResultPage();
},250);}}

// NANAMPY: Function ho an'ny fampisehoana result page
function showResultPage() {
  const passed = score >= 3; // 3/5 na mihoatra dia mandresy
  
  if (passed) {
    showWinResult();
  } else {
    showLoseResult();
  }
}

// JS ho an'ny confetti ravinkazo
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const leaves = [];
  const leafColors = ['#4CAF50', '#66BB6A', '#81C784', '#388E3C', '#2E7D32'];

  for(let i = 0; i < 80; i++){
    leaves.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 15 + 8,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 4 - 2,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      opacity: Math.random() * 0.8 + 0.2
    });
  }

  function drawLeaf(leaf) {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate(leaf.rotation * Math.PI / 180);
    ctx.globalAlpha = leaf.opacity;
    ctx.fillStyle = leaf.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, leaf.size/2, leaf.size, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -leaf.size);
    ctx.lineTo(0, leaf.size);
    ctx.stroke();
    ctx.restore();
  }

  function animateConfetti(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leaves.forEach((leaf, i) => {
      leaf.x += leaf.speedX;
      leaf.y += leaf.speedY;
      leaf.rotation += leaf.rotationSpeed;
      if(leaf.y > canvas.height + 50){
        leaf.y = -50;
        leaf.x = Math.random() * canvas.width;
      }
      if(leaf.x > canvas.width + 50){
        leaf.x = -50;
      } else if(leaf.x < -50){
        leaf.x = canvas.width + 50;
      }
      drawLeaf(leaf);
    });
    confettiAnimation = requestAnimationFrame(animateConfetti);
  }

  animateConfetti();
}

function stopConfetti() {
  if(confettiAnimation) {
    cancelAnimationFrame(confettiAnimation);
  }
}

function showWinResult() {
  const overlay = document.getElementById('resultOverlay');
  const card = document.getElementById('resultCard');
  const text = document.getElementById('resultText');
  const emoji = document.getElementById('resultEmoji');
  const scoreDisplay = document.getElementById('resultScore');

  text.textContent = 'Félicitation!';
  emoji.textContent = '🎉';
  scoreDisplay.textContent = `Score: ${score}/5`;
  card.className = 'result-card celebrate';
  text.className = 'result-text';
  overlay.style.display = 'flex';

  setTimeout(() => {
    launchConfetti();
  }, 500);

  setTimeout(() => {
    card.classList.remove('celebrate');
  }, 1000);

  console.log('Player won! Score:', score);
}

function showLoseResult() {
  const overlay = document.getElementById('resultOverlay');
  const card = document.getElementById('resultCard');
  const text = document.getElementById('resultText');
  const emoji = document.getElementById('resultEmoji');
  const scoreDisplay = document.getElementById('resultScore');

  text.textContent = 'Game Over';
  emoji.textContent = url('../images/m2.png');
  scoreDisplay.textContent = `Score Final: ${score}/5`;
  card.className = 'result-card lose';
  text.className = 'result-text lose';
  overlay.style.display = 'flex';

  console.log('Player lost! Final Score:', score);

  setTimeout(() => {
    overlay.style.display = 'none';
    restartQuiz();
  }, 2000); 
}

function closeResult() {
  stopConfetti();
  document.getElementById('resultOverlay').style.display = 'none';
}

function restartQuizFromResult() {
  closeResult();
  restartQuiz();
}

function playAgainFromResult() {
  closeResult();
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  displayQuestion();
}

function startNextQuiz(){
  currentQuiz = 2;
  questions = [...questionsSet2];
  resetQuiz();
  document.getElementById('level-badge').textContent = `Niveau ${currentQuiz}`;
  displayQuestion();
}

function restartSameLevel(){
  questions = currentQuiz === 1 ? [...questionsSet1] : [...questionsSet2];
  resetQuiz();
}

function resetQuiz(){
  currentQuestionIndex = 0;
  score = 0;
}

function showCompletionMessage(msg){
  document.getElementById('final-message').textContent = msg;
  document.getElementById('final-score').textContent = `ton score: ${score}/5`;
  document.getElementById('completion-message').style.display = 'block';
}

function hideCompletionMessage(){
  document.getElementById('completion-message').style.display = 'none';
}

function restartQuiz(){
  currentQuiz = 1;
  questions = [...questionsSet1];
  resetQuiz();
  document.getElementById('level-badge').textContent = 'Niveau 1';
  hideCompletionMessage();
  displayQuestion();
}

// ✅ CORRECTION: Redirection vers la page d'accueil (section1)
function goBack() {
  console.log('Retour');
  window.location.href = "/section1";
}

displayQuestion();
