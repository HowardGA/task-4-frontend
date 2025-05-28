export const getActivityCountsByDay = (activities, days = 7) => {
  const counts = Array(days).fill(0);
  const today = new Date();
  
  activities.forEach(({ timestamp }) => {
    const date = new Date(timestamp);
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    if (diffDays < days) {
      counts[days - diffDays - 1]++;
    }
  });

  return counts;
};