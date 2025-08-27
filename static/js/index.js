document.addEventListener('DOMContentLoaded', () => {
  const screens = document.querySelectorAll('.screen');
  const btnBack1 = document.getElementById('backScreen1');
  const btnBack2 = document.getElementById('backScreen2');
  const btnBack3 = document.getElementById('backScreen3');
  const menuBtn1 = document.getElementById('menuBtn1');
  const menuBtn2 = document.getElementById('menuBtn2');
  const startBtn = document.getElementById('startBtn');
  const loginBtn = document.getElementById('loginBtn');
  const validateBtn = document.getElementById('validateBtn');
  const returnBtn = document.getElementById('returnBtn');

  // Nouvelle logique : ajout des boutons de choix écran 3
  const choix1Btn = document.querySelector('.btn.blue:nth-of-type(1)');
  const choix2Btn = document.querySelector('.btn.blue:nth-of-type(2)');
  const choix3Btn = document.querySelector('.btn.blue:nth-of-type(3)');

  // Fonction pour afficher un écran spécifique
  function showScreen(id) {
    screens.forEach(screen => {
      if (screen.id === id) {
        screen.classList.add('active');
      } else {
        screen.classList.remove('active');
      }
    });
  }

  // Afficher écran 1 au démarrage
  showScreen('screen1');

  // Navigation entre écrans

  // Écran 1 -> Écran 2
  startBtn.addEventListener('click', () => {
    showScreen('screen2');
  });

  // Écran 2 -> Écran 3
  validateBtn.addEventListener('click', () => {
    showScreen('screen3');
  });

  // Écran 3 -> Retour à Écran 2
  returnBtn.addEventListener('click', () => {
    showScreen('screen2');
  });

  // Boutons "back" pour revenir à l’écran précédent
  btnBack1.addEventListener('click', () => {
    showScreen('screen1');
  });

  btnBack2.addEventListener('click', () => {
    showScreen('screen1');
  });

  btnBack3.addEventListener('click', () => {
    showScreen('screen2');
  });

  // Boutons menu
  menuBtn1.addEventListener('click', () => {
    alert('Menu écran 1');
  });

  menuBtn2.addEventListener('click', () => {
    alert('Menu écran 2');
  });

  // 🔄 Redirection vers les sections HTML depuis écran 3
  choix1Btn.addEventListener('click', () => {
    window.location.href = '/section1';
  });

  choix2Btn.addEventListener('click', () => {
    window.location.href = '/section2';
  });

  choix3Btn.addEventListener('click', () => {
    window.location.href = '/section3';
  });
});
