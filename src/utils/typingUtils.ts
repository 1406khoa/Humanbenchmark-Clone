const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to display font samples and test keyboards.",
  "In a world of constant change, adaptability is the key to success. Those who embrace new challenges and learn from their experiences are better equipped to handle whatever comes their way.",
  "Technology continues to reshape our daily lives in profound ways. From smartphones to artificial intelligence, these innovations have become integral parts of how we work, communicate, and live.",
  "The art of writing well requires practice, patience, and persistence. Good writers understand that their first draft is just the beginning, and that revision is where the magic truly happens.",
];

export function getRandomText(): string {
  return SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
}

export function calculateWPM(
  charactersTyped: number,
  timeElapsed: number,
  errors: number
): number {
  const minutes = timeElapsed / 60;
  const words = (charactersTyped / 5); // Standard: 5 characters = 1 word
  return Math.round(words / minutes);
}

export function calculateAccuracy(
  totalCharacters: number,
  errors: number
): number {
  if (totalCharacters === 0) return 100;
  return Math.round(((totalCharacters - errors) / totalCharacters) * 100);
}