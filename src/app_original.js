import data from "../data/saga-data.json";
import charaData from "../data/characters.json";
import { createBarChart } from "../graphs/epVSchapt.js";
import { createCircles } from "../graphs/groups.js";

// Récupérer l'élément HTML où vous souhaitez afficher les données
const conteneur = document.querySelector('.container');

conteneur.addEventListener('wheel', function (e) {
    conteneur.scrollLeft += e.deltaY;
});

// When the user scrolls horizontally within the container
conteneur.addEventListener('scroll', () => {
    const scrollLeft = conteneur.scrollLeft;
    const scrollWidth = conteneur.scrollWidth - conteneur.clientWidth;
    const scrolled = (scrollLeft / scrollWidth) * 100;
    document.querySelector(".progress-bar").style.width = scrolled + "%";
});

// Charger le fichier JSON (remplacer "chemin/vers/votre/fichier.json" par le chemin réel de votre fichier JSON)
document.addEventListener("DOMContentLoaded", () => {
    afficherDonnees();
})

// Fonction pour afficher les données dans le HTML
function afficherDonnees() {
    // Saga title
    const sagaTitle = data.Saga.Nom;
    document.getElementById("title").innerHTML = `One Piece<br>${sagaTitle} Saga`;

    // Parcourir les données JSON pour afficher chaque arc
    for (const arc in data.Saga.Arcs) {
        const arcData = data.Saga.Arcs[arc];

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

        // Append graphs
        const luffy = {color: "red", radius: 40, label: charaData.Crew.Luffy.Nom};
        const zoro = {color: "green", radius: 30, label: charaData.Crew.Zoro.Nom};
        createCircles(left, [luffy, zoro]);
        createBarChart(center, [arcData.Chapitres, arcData.Episodes]);
    }
}