// carrossel
document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = 0;

    carouselItems.forEach((item, index) => {
        item.addEventListener('mousedown', e => {
            isDragging = true;
            startPosition = e.pageX - item.offsetLeft;
            previousTranslate = currentTranslate;

            item.style.transition = 'none';
            window.cancelAnimationFrame(animationID);
        });

        item.addEventListener('mouseup', () => {
            isDragging = false;
            const movedBy = currentTranslate - previousTranslate;

            if (movedBy < -100 && index < carouselItems.length - 1) {
                currentTranslate += item.clientWidth;
            }

            if (movedBy > 100 && index > 0) {
                currentTranslate -= item.clientWidth;
            }

            item.style.transition = 'transform 0.3s ease';
            item.style.transform = `translateX(${currentTranslate}px)`;
        });

        item.addEventListener('mouseleave', () => {
            isDragging = false;
            item.style.transition = 'transform 0.3s ease';
            item.style.transform = `translateX(${currentTranslate}px)`;
        });

        item.addEventListener('mousemove', e => {
            if (isDragging) {
                const currentPosition = e.pageX - item.offsetLeft;
                const move = currentPosition - startPosition;
                currentTranslate = previousTranslate + move;

                item.style.transform = `translateX(${currentTranslate}px)`;
            }
        });
    });
});
