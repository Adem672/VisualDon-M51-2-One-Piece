// Charger le fichier JSON (remplacer "chemin/vers/votre/fichier.json" par le chemin réel de votre fichier JSON)
fetch('../data/one-piece.json')
    .then(response => response.json())
    .then(data => {
        // Une fois le JSON chargé, appeler une fonction pour afficher les données dans le HTML
        afficherDonnees(data);
    })
    .catch(error => {
        console.error('Erreur de chargement du fichier JSON:', error);
    });

// Fonction pour afficher les données dans le HTML
function afficherDonnees(data) {
    // Récupérer l'élément HTML où vous souhaitez afficher les données (par exemple, un div avec id="conteneur")
    const conteneur = document.getElementById('conteneur');

    // Parcourir les données JSON pour afficher chaque élément
    for (const arc in data.Arcs) {
        const arcData = data.Arcs[arc];
        const arcDiv = document.createElement('div');
        arcDiv.innerHTML = `
      <h2>${arcData.Nom}</h2>
      <p>Membres de l'équipage : ${arcData.Membres_Chapeau_de_Paille.join(', ')}</p>
      <p>Personnes affrontées : ${arcData.Personnes_affrontees.join(', ')}</p>
      <hr>
    `;
        conteneur.appendChild(arcDiv);
    }
}