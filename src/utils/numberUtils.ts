// Generate a random number of specified length
export function generateNumber(length: number): string {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 10)
  ).join('');
}

// Compare two numbers and return indices of incorrect digits
export function compareNumbers(input: string, correct: string): number[] {
  return Array.from(input).reduce((indices: number[], digit, index) => {
    if (digit !== correct[index]) {
      indices.push(index);
    }
    return indices;
  }, []);
}

// Calculate display duration based on level
export function getDisplayDuration(level: number): number {
  // Base duration of 1200ms, adding 300ms per digit
  return Math.min(1200 + (level * 300), 5000);
}