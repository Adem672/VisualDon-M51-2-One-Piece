import saga from "../data/saga-data.json";
import arcPage from './index_original.html'

const images = [...document.querySelectorAll(".img")];
const items = [...document.querySelectorAll(".item")];
const slider = document.querySelector(".slider");
const conteneur = document.querySelector('.container');
const arcKeys = Object.keys(saga.Saga.Arcs);
let counter = 0;
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .04;

// Arc title
items.forEach(item => {
    const title = document.createElement("p");
    title.classList.add("arc-title");
    title.textContent = saga.Saga.Arcs[arcKeys[counter++]].Nom;
    item.appendChild(title);
})

// Arc image
images.forEach((img, index) => {
    img.style.backgroundImage = `url(./img/arcs/${index + 1}.jpg)`;
})

// Slider + Parallax functions
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function setTransform(el, transform) {
    el.style.transform = transform;
}

function init() {
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
}

function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`);
    animateImage();
    requestAnimationFrame(animate);
}

function animateImage() {
    const ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, index) => {
        intersectionRatioValue = ratio - (index * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 150}px)`);
    })
}

function afficherDonnees() {
    // Saga title
    const sagaTitle = saga.Saga.Nom;
    document.getElementById("title").innerHTML = `One Piece<br>${sagaTitle} Saga`;

    // Parcourir les données JSON pour afficher chaque arc
    for (const arc in saga.Saga.Arcs) {
        const arcData = saga.Saga.Arcs[arc];

        // Containers
        const arcBackground = document.createElement('section');
        arcBackground.classList.add("arc-background");

        const dataDiv = document.createElement("div");
        dataDiv.classList.add("arc-data");

        // Positioning
        const left = document.createElement("div");
        left.classList.add("left");
        const center = document.createElement("div");
        center.classList.add("center");
        const right = document.createElement("div");
        right.classList.add("right");

        // Arc title
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("arc-title");

        const title = document.createElement("h2");
        title.classList.add("arc-title-text");
        title.textContent += arcData.Nom;

        const title2 = document.createElement("h2");
        title2.classList.add("arc-title-text");
        title2.classList.add("second-text");
        title2.textContent += arcData.Nom;

        // Arc protagonists
        const equipage = document.createElement("p");
        equipage.textContent = "Membres de l'équipage :";
        const membresAllies = document.createElement("ul");
        arcData.Membres_Chapeau_de_Paille.forEach(membre => {
            const nomMembre = document.createElement("li");
            nomMembre.textContent = membre;
            membresAllies.appendChild(nomMembre);
        })

        // Arc antagonists
        const ennemis = document.createElement("p");
        ennemis.textContent = "Personnes affrontées :";
        const membresEnnemis = document.createElement("ul");
        arcData.Personnes_affrontees.forEach(membre => {
            const nomMembre = document.createElement("li");
            nomMembre.textContent = membre;
            membresEnnemis.appendChild(nomMembre);
        })

        // Append to containers
        titleDiv.appendChild(title);
        titleDiv.appendChild(title2);

        equipage.appendChild(membresAllies);
        left.appendChild(equipage);

        center.appendChild(document.createElement("h3"));

        ennemis.appendChild(membresEnnemis);
        right.appendChild(ennemis);

        arcBackground.appendChild(titleDiv);
        arcBackground.appendChild(left);
        arcBackground.appendChild(center);
        arcBackground.appendChild(right);

        conteneur.appendChild(arcBackground);

    }
}

const toggleSection = (hash) => {
    document.querySelector(`section.active`)?.classList.remove('active')
    document.querySelector(`${hash}-section`)?.classList.add('active')
}

// Event listeners
document.addEventListener("click", e => {
    switch (e.target.classList[0]) {
        case "img":
        case "arc-title":
            let arcTitle = e.target.parentNode.children[1].textContent;

            // Remplacer les espaces et les apostrophes par des tirets et capitaliser chaque mot
            const formattedTitle = arcTitle.replace(/(?:\s|')+/g, '_') // Remplace les espaces et les apostrophes par des tirets
                .toLowerCase() // Convertit tout en minuscules
                .split('_') // Divise la chaîne en tableau de mots
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Met la première lettre en majuscule pour chaque mot
                .join('_'); // Réassemble les mots avec des tirets

            toggleSection("saga")
            afficherDonnees()
            break;
    }
})

window.addEventListener("resize", init);

document.addEventListener("DOMContentLoaded", () => {
    init();
    animate();
})
