/**
 * Calculate annual cost of machine-replaceable work.
 * Assumes a 40-hour work week. The fraction of routine hours maps directly to
 * the fraction of paid time that's replaceable, so annual waste is:
 *   staff × monthlyWage × (routineHours / 40) × 12
 */
export function calculateAnnualWaste(
  staff: number,
  monthlyWage: number,
  hoursRoutinePerWeek: number,
): number {
  const routineFraction = Math.max(0, Math.min(1, hoursRoutinePerWeek / 40));
  return Math.round(staff * monthlyWage * routineFraction * 12);
}

export const CALCULATOR_DEFAULTS = {
  staff: 5,
  wage: 4000,
  hours: 20,
} as const;

export const CALCULATOR_BOUNDS = {
  staff: { min: 1, max: 50 },
  wage: { min: 1500, max: 15000 },
  hours: { min: 0, max: 40 },
} as const;
