// Charger le fichier JSON (remplacer "chemin/vers/votre/fichier.json" par le chemin réel de votre fichier JSON)

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const req = await fetch("../data/one-piece.json");
        if (!req.ok) {
            throw new Error(`Failed to fetch: ${req.status}`);
        }
        const rep = await req.json();
        afficherDonnees(rep);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
})

// Fonction pour afficher les données dans le HTML
function afficherDonnees(data) {
    // Récupérer l'élément HTML où vous souhaitez afficher les données (par exemple, un div avec id="conteneur")
    const conteneur = document.getElementById('conteneur');

    // Parcourir les données JSON pour afficher chaque élément
    for (const arc in data.Arcs) {
        const arcData = data.Arcs[arc];
        const arcDiv = document.createElement('div');

        const title = document.createElement("h2");
        title.textContent = arcData.Nom;

        const equipage = document.createElement("p");
        equipage.textContent = `Membres de l'équipage : ${arcData.Membres_Chapeau_de_Paille.join(', ')}`;

        const ennemis = document.createElement("p");
        equipage.textContent = `Personnes affrontées : ${arcData.Personnes_affrontees.join(', ')}`;

        const hr = document.createElement("hr");
        
        arcDiv.appendChild(title);
        arcDiv.appendChild(equipage);
        arcDiv.appendChild(ennemis);
        arcDiv.appendChild(hr);
        conteneur.appendChild(arcDiv);
    }
}