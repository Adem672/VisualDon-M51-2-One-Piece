import saga from "../data/saga-data.json";

const images = [...document.querySelectorAll(".img")];
const items = [...document.querySelectorAll(".item")];
const arcKeys = Object.keys(saga.Saga.Arcs);
let counter = 0;

function initCards() {
    // Arc title
    items.forEach(item => {
        const title = document.createElement("p");
        title.classList.add("home-arc-title");
        title.textContent = saga.Saga.Arcs[arcKeys[counter++]].Nom;
        item.appendChild(title);
    })

    // Arc image
    images.forEach((img, index) => {
        img.style.backgroundImage = `url(./img/arcs/${index + 1}.jpg)`;
    })

    resetHome();
}

function resetHome() {
    document.querySelector(".slider").style.width = "156vw";
}

function hideHome() {
    document.querySelector(".slider").style.width = 0;
}

export { initCards, resetHome, hideHome }