import { hideHome, initCards, resetHome } from "../modules/initHome.js";
import { afficherDonnees } from "../modules/loadData.js";
import { initParallax, animate } from "../modules/parallax.js";
import { scroll } from "../modules/scroll.js";

let memScroll = 0;

// Switch views (home / arc)
const toggleSection = (hash) => {
    document.querySelector(`section.active`)?.classList.remove('active');
    document.querySelector(`#${hash}-section`)?.classList.add('active');
}

document.addEventListener("click", e => {
    switch (e.target.classList[0]) {
        case "img":
        case "arc-title":
            memScroll = window.scrollY;

            const arcTitle = e.target.parentNode.children[1].textContent;

            // Remplacer les espaces et les apostrophes par des tirets et capitaliser chaque mot
            const formattedTitle = "Arc_"+arcTitle.replace(/(?:\s|')+/g, '_') // Remplace les espaces et les apostrophes par des tirets
                .toLowerCase() // Convertit tout en minuscules
                .split('_') // Divise la chaîne en tableau de mots
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Met la première lettre en majuscule pour chaque mot
                .join('_'); // Réassemble les mots avec des tirets

            hideHome();
            toggleSection("saga");
            afficherDonnees(formattedTitle);
            break;

        case "back":
            resetHome();
            toggleSection("home");
            window.scrollTo(0, memScroll);
            break;
    }
})

// Diplay back button
document.addEventListener("mousemove", e => {
    const backButton = document.querySelector("#saga-section .back");
    const screenWidth = window.innerWidth;
    const threshold = screenWidth/32;
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
