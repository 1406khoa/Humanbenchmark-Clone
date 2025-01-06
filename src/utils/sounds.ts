// Create audio instances for better performance
const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/wrong.mp3');

// Preload sounds
correctSound.load();
wrongSound.load();

export const playSound = {
  correct: () => {
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
  },
  wrong: () => {
    wrongSound.currentTime = 0;
    wrongSound.play().catch(() => {});
  }
};