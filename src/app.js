import saga from "../data/saga-data.json";
import arcPage from './index_original.html'

const images = [...document.querySelectorAll(".img")];
const items = [...document.querySelectorAll(".item")];
const slider = document.querySelector(".slider");
const arcKeys = Object.keys(saga.Saga.Arcs);
let counter = 0;
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .04;

// Arc title
items.forEach(item => {
    const title = document.createElement("p");
    title.classList.add("arc-title");
    title.textContent = saga.Saga.Arcs[arcKeys[counter++]].Nom;
    item.appendChild(title);
})

// Arc image
images.forEach((img, index) => {
    img.style.backgroundImage = `url(./img/arcs/${index + 1}.jpg)`;
})

// Slider + Parallax functions
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function setTransform(el, transform) {
    el.style.transform = transform;
}

function init() {
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
}

function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`);
    animateImage();
    requestAnimationFrame(animate);
}

function animateImage() {
    const ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, index) => {
        intersectionRatioValue = ratio - (index * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 150}px)`);
    })
}

// Event listeners
document.addEventListener("click", e => {
    switch(e.target.classList[0]) {
        case "img":
        case "arc-title":
            window.location.href = arcPage;
            break;
    }
})

window.addEventListener("resize", init);

document.addEventListener("DOMContentLoaded", () => {
    init();
    animate();
})
