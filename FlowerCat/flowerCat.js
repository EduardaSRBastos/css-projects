window.onload = function() {
    var viewportWidth = window.innerWidth;

    function generateHeadFlowers() {
        if (viewportWidth <= 768) {
            var numFlowers = 20;
            var radiusX = 150;
            var radiusY = 130;
        } else {
            var numFlowers = 28;
            var radiusX = 300;
            var radiusY = 260;
        }

        var animationDelay = 0.5;
        var flowerContainer = document.getElementById('flower-container');

        for (var i = 0; i < numFlowers; i++) {
            var angle = (360 / numFlowers) * i + 90;
            var flowerDiv = document.createElement('div');
            flowerDiv.classList.add('flower');
            var x = radiusX * Math.cos(angle * Math.PI / 180);
            var y = radiusY * Math.sin(angle * Math.PI / 180);
            flowerDiv.style.left = x + 'px';
            flowerDiv.style.top = y + 'px';
            flowerDiv.style.animationDelay = animationDelay + 's';
            animationDelay += 0.1;

            for (var j = 0; j < 5; j++) {
                var petalDiv = document.createElement('div');
                petalDiv.classList.add('petal');
                flowerDiv.appendChild(petalDiv);
            }

            var centerDiv = document.createElement('div');
            centerDiv.classList.add('center');
            flowerDiv.appendChild(centerDiv);
            flowerContainer.appendChild(flowerDiv);
        }
    }

    function generateEarFlowers(posX, posY, earAngle) {
        var flowerContainer = document.getElementById('flower-container');
        var numLines = 2;
        var animationDelay = 4;

        if (viewportWidth <= 768) {
        var numFlowersPerLine = 2;
        var lineSpacing = 50;
        } else {
        var numFlowersPerLine = 3;
        var lineSpacing = 60;
        }

        for (var i = 0; i < numLines; i++) {
            var angle = (earAngle * i) + 85;
            for (var j = 0; j < numFlowersPerLine; j++) {
                var flowerDiv = document.createElement('div');
                flowerDiv.classList.add('flower');
                var x = (j * lineSpacing) * Math.cos(angle * Math.PI / 180);
                var y = (j * lineSpacing) * Math.sin(angle * Math.PI / 180);
                flowerDiv.style.left = x + posX + 'px';
                flowerDiv.style.top = y - posY + 'px';
                flowerDiv.style.animationDelay = animationDelay + 's';
                animationDelay += 0.2;

                for (var k = 0; k < 5; k++) {
                    var petalDiv = document.createElement('div');
                    petalDiv.classList.add('petal');
                    flowerDiv.appendChild(petalDiv);
                }

                var centerDiv = document.createElement('div');
                centerDiv.classList.add('center');
                flowerDiv.appendChild(centerDiv);

                flowerContainer.appendChild(flowerDiv);
            }
        }
    }

    function generateFaceFlowers() {
        var flowerContainer = document.getElementById('flower-container');
        var animationDelay = 6;

        for (var l = 0; l < 2; l++) {
            var flowerDiv = document.createElement('div');
            flowerDiv.classList.add('flower');
            flowerDiv.style.animationDelay = animationDelay + 's';
            animationDelay += 0.1;

            if (viewportWidth <= 768) {
                flowerDiv.style.left = -65 + (l * 130) + 'px';
                flowerDiv.style.top = -20 + 'px';
            } else {
                flowerDiv.style.left = -130 + (l * 260) + 'px';
                flowerDiv.style.top = -40 + 'px';
            }

            for (var m = 0; m < 5; m++) {
                var petalDiv = document.createElement('div');
                petalDiv.classList.add('petal');
                flowerDiv.appendChild(petalDiv);
            }

            var centerDiv = document.createElement('div');
            centerDiv.classList.add('center');
            flowerDiv.appendChild(centerDiv);
            flowerContainer.appendChild(flowerDiv);
        }
        
        if (viewportWidth <= 768) {
            var numFlowers = 3;
            var spacing = 25;
        } else {
            var numFlowers = 3;
            var spacing = 40;
        }

        for (var i = 0; i < numFlowers; i++) {
            for (var j = 0; j < numFlowers; j++) {

                if (i === j) {
                    var flowerDiv = document.createElement('div');
                    flowerDiv.classList.add('flower');
                    flowerDiv.style.animationDelay = 1 + animationDelay + 's';
                    animationDelay += 0.1;

                    if (viewportWidth <= 768) {
                        flowerDiv.style.left = -25 + (i * spacing) + 'px';
                        flowerDiv.style.top = 25 + (i * spacing) + 'px';
                    } else {
                        flowerDiv.style.left = -40 + (i * spacing) + 'px';
                        flowerDiv.style.top = 40 + (i * spacing) + 'px';
                    }
                    
                    for (var k = 0; k < 5; k++) {
                        var petalDiv = document.createElement('div');
                        petalDiv.classList.add('petal');
                        flowerDiv.appendChild(petalDiv);
                    }
                    
                    var centerDiv = document.createElement('div');
                    centerDiv.classList.add('center');
                    flowerDiv.appendChild(centerDiv);
                    flowerContainer.appendChild(flowerDiv);

                } else if (i + j === (numFlowers - 1)) {
                    var flowerDiv = document.createElement('div');
                    flowerDiv.classList.add('flower');
                    flowerDiv.style.animationDelay = 1 + animationDelay + 's';
                    animationDelay += 0.1;

                    if (viewportWidth <= 768) {
                        flowerDiv.style.left = -25 + (j * spacing) + 'px';
                        flowerDiv.style.top = 25 + (i * spacing) + 'px';
                    } else {
                        flowerDiv.style.left = -40 + (j * spacing) + 'px';
                        flowerDiv.style.top = 40 + (i * spacing) + 'px';
                    }
                    
                    for (var k = 0; k < 5; k++) {
                        var petalDiv = document.createElement('div');
                        petalDiv.classList.add('petal');
                        flowerDiv.appendChild(petalDiv);
                    }
                    
                    var centerDiv = document.createElement('div');
                    centerDiv.classList.add('center');
                    flowerDiv.appendChild(centerDiv);
                    flowerContainer.appendChild(flowerDiv);
                }
            }
        }
    }
   
    function resetFlowerAnimation() {
        var flowerContainer = document.getElementById('flower-container');
        var container = document.getElementById('container');
        flowerContainer.style.animation = 'none';
        flowerContainer.offsetHeight;
        flowerContainer.style.animation = 'moveUp 2s forwards';
        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = 'moveUpDownContainer 3s 9s forwards';
    }

    function generateFlowersAndResetAnimation() {
        var flowerContainer = document.getElementById('flower-container');

        while (flowerContainer.firstChild) {
            flowerContainer.removeChild(flowerContainer.firstChild);
        }

        setTimeout(function() {
            generateHeadFlowers();
            if (viewportWidth <= 768) {
                generateEarFlowers(142.5, 150, 85);
                generateEarFlowers(-145, 145, -75);
            } else {
                generateEarFlowers(285, 300, 85);
                generateEarFlowers(-290, 290, -75);
            }
            generateFaceFlowers();
        }, 950);
        resetFlowerAnimation();
    }

    generateFlowersAndResetAnimation();

    setInterval(generateFlowersAndResetAnimation, 10500);
};