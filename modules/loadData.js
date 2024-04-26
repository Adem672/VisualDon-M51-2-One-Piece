import saga from "../data/saga-data.json";
import { resetScroll } from "./scroll";

const container = document.querySelector('.container');
const slider = document.querySelector('.slider');

export function afficherDonnees(arc) {
    // Reset container
    container.innerHTML = "";
    resetScroll();

    // JSON data for the specific arc
    const arcData = saga.Saga.Arcs[arc];

    // Containers
    const arcBackground = document.createElement('div');
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

    container.appendChild(arcBackground);
}