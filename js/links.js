// ===========================
// Ссылки: конфигурация
// ===========================
const links = [
    {
        name: "Готовимся к смелову",
        url: "https://docs.google.com/document/d/1lAASTlyIdZdBzEUxp8GuiGcyJnGwWQtoR7YZ5vCSND4/edit?tab=t.0",
    },
    { name: "Расписание", url: "https://it.belstu.by/studentam/uchebnyj-process" },
    { name: "Система дистанционного обучения", url: "https://dist.belstu.by/" },
    {
        name: "Diskstation",
        url: "https://diskstation.belstu.by/",
        icon: "https://diskstation.belstu.by:5001/webman/resources/images/icon_dsm_64.png?v=40438",
    },
];

const TEXT_COPY = "Копировать";
const TEXT_COPIED = "Скопировано!";
const TEXT_ERROR = "Ошибка";
const COPY_MSG_DURATION = 1500;

const grid = document.getElementById("links-grid");
links.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => window.open(item.url, "_blank");

    const img = document.createElement("img");

    img.src = item.icon || `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64`;
    img.alt = "";

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("span");
    title.textContent = item.name;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = '<span class="material-symbols-outlined">content_copy</span>';
    copyBtn.onclick = (e) => {
        e.stopPropagation();
        navigator.clipboard
            .writeText(item.url)
            .then(() => {
                copyBtn.innerHTML = '<span class="material-symbols-outlined">check</span>';
            })
            .catch(() => {
                copyBtn.innerHTML = '<span class="material-symbols-outlined">error</span>';
            })
            .finally(() => {
                setTimeout(() => {
                    copyBtn.innerHTML = '<span class="material-symbols-outlined">content_copy</span>';
                }, COPY_MSG_DURATION);
            });
    };

    content.append(title, copyBtn);
    card.append(img, content);
    grid.append(card);
});