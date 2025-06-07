// ===========================
// Калькулятор среднего
// ===========================
const avgToggle = document.getElementById("avg-toggle");
const avgSection = document.getElementById("avg-section");
const avgSelect = document.getElementById("avg-count");
const avgInputs = document.getElementById("avg-inputs");
const avgResult = document.getElementById("avg-result");

// Создаём опции селекта от 2 до 10
for (let i = 2; i <= 10; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    avgSelect.append(opt);
}
avgSelect.value = 2;

// Отображение/скрытие секции
avgToggle.addEventListener("click", () => {
    const visible = avgSection.style.display === "block";
    avgSection.style.display = visible ? "none" : "block";
    avgToggle.textContent = visible ? "Показать калькулятор среднего" : "Скрыть калькулятор среднего";
});

// Текущее число полей
let currentCount = parseInt(avgSelect.value, 10);

// Создаём один блок label+input
function createField(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "avg-item";

    const label = document.createElement("label");
    label.textContent = `Предмет ${index}`;
    label.addEventListener("dblclick", () => {
        label.contentEditable = "true";
        label.focus();
    });
    label.addEventListener("blur", () => {
        label.contentEditable = "false";
    });

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "10";
    input.step = "0.01";
    input.addEventListener("input", updateAverage);

    wrapper.append(label, input);
    return wrapper;
}

// Первый рендер полей
function renderInitialFields(count) {
    avgInputs.innerHTML = "";
    for (let i = 1; i <= count; i++) {
        avgInputs.append(createField(i));
    }
    updateAverage();
}
renderInitialFields(currentCount);

// Обновление среднего
function updateAverage() {
    const values = Array.from(avgInputs.querySelectorAll("input"))
        .map((i) => parseFloat(i.value))
        .filter((v) => !isNaN(v));
    if (values.length === 0) {
        avgResult.textContent = "Среднее: —";
        return;
    }
    const sum = values.reduce((a, b) => a + b, 0);
    avgResult.textContent = `Среднее: ${(sum / values.length).toFixed(2)}`;
}

// Динамическое добавление/удаление полей при смене селекта
avgSelect.addEventListener("change", () => {
    const newCount = parseInt(avgSelect.value, 10);
    if (newCount > currentCount) {
        // добавляем поля
        for (let i = currentCount + 1; i <= newCount; i++) {
            avgInputs.append(createField(i));
        }
    } else if (newCount < currentCount) {
        // удаляем поля с конца
        for (let i = 0; i < currentCount - newCount; i++) {
            avgInputs.lastElementChild.remove();
        }
    }
    currentCount = newCount;
    updateAverage();
});