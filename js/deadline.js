function getNextFridayDeadline() {
  const now = new Date();
  const currentDay = now.getDay();
  const daysToFriday = (5 - currentDay + 7) % 7 || 7;

  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysToFriday);
  nextFriday.setHours(23, 59, 59, 999);

  return nextFriday.getTime();
}

const deadline = getNextFridayDeadline();

const basePrices = {
  standard: 7560,
  pro: 10080,
  premium: 13860
};

const increments = [1000]; // підвищення ціни

function getIncrementedPrice(base, step) {
  return base + increments[step];
}

function updateCountdown(id) {
  const now = new Date().getTime();
  const diff = deadline - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const container = document.getElementById(id);
  if (container) {
    container.querySelector('.pricing__days').textContent = days;
    container.querySelector('.pricing__hours').textContent = hours.toString().padStart(2, '0');
    container.querySelector('.pricing__minutes').textContent = minutes.toString().padStart(2, '0');
    container.querySelector('.pricing__seconds').textContent = seconds.toString().padStart(2, '0');
  }
}

function updatePrice(selector, base, step) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = `${getIncrementedPrice(base, step)} <span class="price__gtn">грн</span>`;
}

function updatePrices() {
  const now = Date.now();
  const totalDiff = deadline - now;
  const maxPeriod = 4 * 24 * 60 * 60 * 1000;
  const passed = Math.floor((getNextFridayDeadline() - totalDiff - now) / maxPeriod);
  const step = Math.min(passed, increments.length - 1);

  updatePrice('.price__new--standard', basePrices.standard, step);
  updatePrice('.price__new--pro', basePrices.pro, step);
  updatePrice('.price__new--premium', basePrices.premium, step);
}



setInterval(() => {
  updateCountdown("countdown-top");
  updateCountdown("countdown-bottom");
  updatePrices();
}, 1000);
