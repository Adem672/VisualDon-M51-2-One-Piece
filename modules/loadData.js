import saga from "../data/saga-data.json";
import { epVsChapChart } from "../graphs/epVSchapt.js";
import { createGroup } from "../graphs/groups.js";
import { resetScroll } from "./scroll";

const container = document.querySelector('.container');

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
    titleDiv.classList.add("scrolling-arc-title");

    const title = document.createElement("h2");
    title.classList.add("arc-title-text");
    title.textContent += arcData.Nom;

    const title2 = document.createElement("h2");
    title2.classList.add("arc-title-text");
    title2.classList.add("second-text");
    title2.textContent += arcData.Nom;

    // Arc protagonists
    const equipage = document.createElement("div");
    const membresAllies = [];
    arcData.Membres_Chapeau_de_Paille.forEach(membre => {
        membresAllies.push(membre);
    })

    // Arc antagonists
    const antagonistes = document.createElement("div");
    antagonistes.classList.add("groups");
    const membresEnnemis = [];
    arcData.Personnes_affrontees.forEach(membre => {
        membresEnnemis.push(membre);
    })

    // Arc description
    const description = document.createElement("p");
    description.classList.add("arc-description");
    description.textContent = arcData.Description;

    // EpVsChart
    const pieChartContainer = document.createElement("div");
    pieChartContainer.classList.add("svgContainer");
    const pieChart = epVsChapChart(arcData);
    pieChartContainer.appendChild(pieChart);

    // Append to containers
    titleDiv.appendChild(title);
    titleDiv.appendChild(title2);

    const allies = createGroup(membresAllies);
    equipage.appendChild(allies);
    left.appendChild(equipage);

    for (let i = 1; i <= 2; ++i) {
        // Arc images
        const img = document.createElement("img");
        img.classList.add("inside-arc-image");

        // Nommer les images nom_arc-1.jpg et nom_arc-2.jpg
        img.style.backgroundImage = `url(./img/inside_arcs/${arcData.Nom.toLowerCase().replace(/(?:\s|')+/g, '_')}-${i}.jpg)`
        center.appendChild(img);
    }
    center.appendChild(description);
    center.appendChild(pieChartContainer);

    const ennemis = createGroup(membresEnnemis);
    antagonistes.appendChild(ennemis);
    right.appendChild(antagonistes);

    arcBackground.appendChild(titleDiv);
    arcBackground.appendChild(left);
    arcBackground.appendChild(center);
    arcBackground.appendChild(right);

    container.appendChild(arcBackground);
}