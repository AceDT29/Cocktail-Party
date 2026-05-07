
export function useGenerateRandom(n) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const result = [];
  while (result.length < n && alphabet.length > 0) {
    const idx = Math.floor(Math.random() * alphabet.length);
    result.push(alphabet[idx]);
    alphabet.splice(idx, 1);
  }
  return result;
}
