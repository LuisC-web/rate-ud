export const scores = Array.from({ length: 100 }, () => ({
  value: Math.floor(Math.random() * 5) + 1,
}));
