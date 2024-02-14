export function randomString(): string {
  return Math.random().toString(20).substring(0, 8);
}
