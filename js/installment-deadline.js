document.addEventListener('DOMContentLoaded', function () {
  const now = new Date();
  now.setDate(now.getDate() + 2);

  const day = now.toLocaleDateString('uk-UA', { day: 'numeric' });
  const month = now.toLocaleDateString('uk-UA', { month: 'long' });

  const deadlineDateEl = document.getElementById('deadline-date');
  const deadlineMonthEl = document.querySelector('.deadline-months');

  if (deadlineDateEl) {
    deadlineDateEl.textContent = day;
  } else {
    console.warn('Елемент #deadline-date не знайдено');
  }

  if (deadlineMonthEl) {
    deadlineMonthEl.textContent = month;
  } else {
    console.warn('Елемент .deadline-months не знайдено');
  }
});
