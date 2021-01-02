export const isSupportPerformance = () => {
  const performance = window.performance
  return performance && !!performance.getEntriesByType && !!performance.now && !!performance.mark;
};

export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}
