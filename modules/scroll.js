const container = document.querySelector('.container');

function setTransform(el, transform) {
    el.style.transform = transform;
}

function scroll() {
    let current = 0;
    let target = 0;
    const ease = 0.04;

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    function animate() {
        current = parseFloat(lerp(current, target, ease)).toFixed(2);
        target = window.scrollY;
        setTransform(container, `translateX(-${current}px)`);
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();
}

function resetScroll() {
    window.scrollTo(0, 0);
}

export { scroll, resetScroll }