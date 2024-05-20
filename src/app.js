import { hideHome, initCards, resetHome } from "../modules/initHome.js";
import { afficherDonnees } from "../modules/loadData.js";
import { initParallax, animate } from "../modules/parallax.js";
import { scroll } from "../modules/scroll.js";

let memScroll = 0;

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}


document.addEventListener("click", e => {
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
