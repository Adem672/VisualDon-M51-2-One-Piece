import data from "../data/saga-data.json";
import { createBarChart } from "../graphs/epVSchapt.js";

// Récupérer l'élément HTML où vous souhaitez afficher les données
const conteneur = document.querySelector('.container');

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
    // applyCSS();
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
        const arcBackground = document.createElement('div');

        const left = document.createElement("div");
        left.classList.add("left");
        const center = document.createElement("div");
        center.classList.add("center");
        const right = document.createElement("div");
        right.classList.add("right");

        arcBackground.classList.add("arc-background");
        // arcBackground.style.backgroundImage = `url("../img/${arcData.Image}")`;

        const dataDiv = document.createElement("div");
        dataDiv.classList.add("arc-data");

        // Arc title
        const title = document.createElement("h2");
        title.textContent = arcData.Nom;

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
        center.appendChild(title);
        equipage.appendChild(membresAllies);
        left.appendChild(equipage);
        ennemis.appendChild(membresEnnemis);
        right.appendChild(ennemis);
        arcBackground.appendChild(left);
        arcBackground.appendChild(center);
        arcBackground.appendChild(right);
        conteneur.appendChild(arcBackground);

        // Append graphs
        createBarChart(center, [arcData.Chapitres, arcData.Episodes]);
    }
}

function applyCSS() {
    // Create a new style element
    const styleElement = document.createElement('style');
    let newBackgroundImageRule;

    Object.keys(data.Saga.Arcs).forEach(arc => {
        const image = data.Saga.Arcs[arc].Image;

        // Define the new background image CSS rule
        newBackgroundImageRule = `
    .arc-background::before,
    #title::before {
        background-image: url("${image}") !important;
    }
`;
    })

    // Append the new CSS rule to the style element
    styleElement.innerHTML = newBackgroundImageRule;

    // Append the style element to the document's head
    // document.head.appendChild(styleElement);

}