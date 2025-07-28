export const scores = Array.from({ length: 100 }, () => ({
  value: Math.floor(Math.random() * 5) + 1,
  teacherId: Math.floor(Math.random() * 40) + 1,
}));
