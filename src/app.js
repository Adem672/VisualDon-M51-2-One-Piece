import { hideHome, initCards, resetHome } from "../modules/initHome.js";
import { afficherDonnees } from "../modules/loadData.js";
import { initParallax, animate } from "../modules/parallax.js";
import { scroll } from "../modules/scroll.js";
import * as d3 from 'd3';

let memScroll = 0;



// Switch views (home / arc)
const toggleSection = (hash) => {
    document.querySelector(`section.active`)?.classList.remove('active');
    document.querySelector(`#${hash}-section`)?.classList.add('active');
}

document.addEventListener("click", e => {
    console.log(e.target.classList[0])
    switch (e.target.classList[0]) {
        case "img":
        case "arc-title":
            memScroll = window.scrollY;

            const arcTitle = e.target.parentNode.children[1].textContent;

            // Remplacer les espaces et les apostrophes par des tirets et capitaliser chaque mot
            const formattedTitle = "Arc_" + arcTitle.replace(/(?:\s|')+/g, '_') // Remplace les espaces et les apostrophes par des tirets
                .toLowerCase() // Convertit tout en minuscules
                .split('_') // Divise la chaîne en tableau de mots
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Met la première lettre en majuscule pour chaque mot
                .join('_'); // Réassemble les mots avec des tirets

            toggleSection("saga");
            afficherDonnees(formattedTitle);
            break;

        case "back":
            toggleSection("home");
            window.scrollTo(0, memScroll);
            break;

        case "introduction":
            // Remove any existing info-bubble
            d3.selectAll('.info-bubble').remove();

            // Get the viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate the position for the bubble to be in the center of the viewport
            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;

            // Create and style the info-bubble
            const bubble = d3.select('body').append('div')
                .attr('class', 'info-bubble')
                .style('position', 'fixed') // Use 'fixed' to position relative to the viewport
                .style('left', `${centerX}px`)
                .style('top', `${centerY}px`)
                .style('transform', 'translate(-50%, -50%)')
                .style('padding', '20px')
                .style('background', 'rgba(0, 0, 0, 0.8)')
                .style('color', 'white')
                .style('border-radius', '10px')
                .style('text-align', 'center')
                .style('max-width', '700px')
                .style('z-index', '1000')
                .html(`<h2>Bienvenue dans notre projet</h2><p>Le but de ce projet est de fournir des informations complètes et détaillées sur la saga East Blue de One
                Piece. Cette première saga de la célèbre série manga créée par Eiichiro Oda pose les bases de l'épopée en
                introduisant les personnages principaux, leurs rêves, et les premiers défis qu'ils doivent surmonter. À
                travers cette exploration, nous plongerons dans l'univers fascinant de l'East Blue, en mettant en lumière
                les événements clés, les thèmes centraux et les moments mémorables qui ont captivé des millions de fans à
                travers le monde.</p><button id="close-info-bubble">Close</button>`);

            // Add event listener to close the info-bubble
            d3.select('#close-info-bubble').on('click', function () {
                bubble.remove();
            });
            break;
    }
})

// Diplay back button
document.addEventListener("mousemove", e => {
    const backButton = document.querySelector("#saga-section .back");
    const screenWidth = window.innerWidth;
    const threshold = screenWidth / 32;
    if (e.pageX >= screenWidth - threshold) {
        backButton.classList.add("show");
    } else {
        backButton.classList.remove("show");
    }
})

// Adapt window on resize
window.addEventListener("resize", initParallax);

// Init elements
document.addEventListener("DOMContentLoaded", () => {
    initCards();
    initParallax();
    animate();
    scroll();
})
