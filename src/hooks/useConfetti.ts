
import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#33C3F0'],
    });
  };

  return { triggerConfetti };
};
