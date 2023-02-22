export function sleep(time?: number) {
  return new Promise((resolve) => setTimeout(resolve, time ?? 200));
}
