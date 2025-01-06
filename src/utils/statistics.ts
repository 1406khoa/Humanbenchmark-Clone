// Generate points for a bell curve distribution
export function generateBellCurvePoints(mean: number, stdDev: number): { ms: number; value: number }[] {
  const points: { ms: number; value: number }[] = [];
  const start = mean - (stdDev * 4); // Start 4 standard deviations below mean
  const end = mean + (stdDev * 4);   // End 4 standard deviations above mean
  const step = 1;                     // Smaller step for smoother curve

  for (let x = start; x <= end; x += step) {
    // Calculate normal distribution
    const value = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                 Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) * 100;

    points.push({ ms: x, value });
  }

  return points;
}