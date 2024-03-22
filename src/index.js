import data from "../data/saga-data.json";

// Charger le fichier JSON (remplacer "chemin/vers/votre/fichier.json" par le chemin réel de votre fichier JSON)
document.addEventListener("DOMContentLoaded", () => {
    afficherDonnees(data);
})

// Fonction pour afficher les données dans le HTML
function afficherDonnees(data) {
    // Page de titre de la saga
    const sagaTitle = data.Saga.Nom;
    document.getElementById("title").innerHTML = `One Piece<br>${sagaTitle} Saga`;

    // Récupérer l'élément HTML où vous souhaitez afficher les données
    const conteneur = document.querySelector('.container');

    // Parcourir les données JSON pour afficher chaque arc
    for (const arc in data.Saga.Arcs) {
        // Containers
        const arcData = data.Saga.Arcs[arc];
        const arcDiv = document.createElement('div');
        arcDiv.classList.add("arc-background");
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

        // Arc duration
        const chapitres = document.createElement("p");
        chapitres.textContent = `Chapitres : ${arcData.Chapitres}`;
        
        const episodes = document.createElement("p");
        episodes.textContent = `Episodes : ${arcData.Episodes}`;
        
        // Append to containers
        dataDiv.appendChild(title);
        equipage.appendChild(membresAllies);
        dataDiv.appendChild(equipage);
        ennemis.appendChild(membresEnnemis);
        dataDiv.appendChild(ennemis);
        dataDiv.appendChild(chapitres);
        dataDiv.appendChild(episodes);
        arcDiv.appendChild(dataDiv);
        conteneur.appendChild(arcDiv);
    }
}