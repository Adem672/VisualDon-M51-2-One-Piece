const slider = document.querySelector(".slider");
const images = [...document.querySelectorAll(".img")];
const ease = .04;
let current = 0;
let target = 0;
let sliderWidth;
let imageWidth;

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function setTransform(el, transform) {
    el.style.transform = transform;
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

function initParallax() {
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
}

export { initParallax, animate }