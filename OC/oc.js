document.addEventListener('DOMContentLoaded', function() {
    const eyesFollow = document.querySelectorAll('.eyeFollow');
    const defaultPositions = Array.from(eyesFollow).map(eye => {
        return { 
            element: eye,
            defaultLeft: eye.style.left,
            defaultTop: eye.style.top
        };
    });

    document.addEventListener('mousemove', function(event) {
        const container = document.querySelector('.container');
        if (!container.contains(event.target)) {
            defaultPositions.forEach(({ element, defaultLeft, defaultTop }) => {
                element.style.transition = 'left 0.3s ease, top 0.3s ease';
                element.style.left = defaultLeft;
                element.style.top = defaultTop;
            });
            return;
        }

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        eyesFollow.forEach(eye => {
            const eyeRect = eye.parentElement.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), eyeRect.width / 2 - 10);
            const newX = Math.cos(angle) * distance + eyeRect.width / 2 - 5;
            const newY = Math.sin(angle) * distance + eyeRect.height / 2 - 5;

            eye.style.transition = 'none';
            eye.style.left = `${newX}px`;
            eye.style.top = `${newY}px`;
        });
    });
});

function startNoseWiggle() {
    const nose = document.querySelector('.nose');
    nose.classList.add('wiggle');
    
    setTimeout(function() {
        nose.classList.remove('wiggle');
    }, 1500);
}


