// ===========================
// Обратный отсчёт до 06.06.2025
// ===========================
function updateCountdown() {
    const now = new Date();
    const target = new Date("2025-06-06T00:00:00");
    const section = document.querySelector(".countdown-section");
    const timerElem = document.getElementById("countdown-timer");
    const diff = target - now;

    if (diff < 0) {
        section.style.display = "none";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) {
        timerElem.innerHTML = `
    <img
      src="smelov.jpg"
      width="400px"
      alt="Все, пиздец!"
      style="max-width: 100%; height: auto;"
    />
  `;
        return;
    }

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElem.textContent = `${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`;
}

// Инициализация и интервал
updateCountdown();
setInterval(updateCountdown, 1000);