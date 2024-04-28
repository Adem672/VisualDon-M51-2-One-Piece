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
    titleDiv.classList.add("arc-title");

    const title = document.createElement("h2");
    title.classList.add("arc-title-text");
    title.textContent += arcData.Nom;

    const title2 = document.createElement("h2");
    title2.classList.add("arc-title-text");
    title2.classList.add("second-text");
    title2.textContent += arcData.Nom;

    // Arc protagonists
    const equipage = document.createElement("div");
    equipage.classList.add("groups");
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

    // EpVsChart
    const pieChartContainer = document.createElement("div");
    pieChartContainer.classList.add("svgContainer");
    const pieChart = epVsChapChart(arcData);
    pieChartContainer.appendChild(pieChart);

    // Append to containers
    titleDiv.appendChild(title);
    titleDiv.appendChild(title2);

    // equipage.appendChild(membresAllies);
    const allies = createGroup(membresAllies);
    equipage.appendChild(allies);
    left.appendChild(equipage);

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