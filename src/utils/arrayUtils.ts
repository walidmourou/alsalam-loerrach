export function createIncrementalArray(n: number): number[] {
  if (n <= 0) {
    return [];
  }
  return Array.from({ length: n }, (_, index) => index + 1);
}
