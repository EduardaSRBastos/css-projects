function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

function getRandomBrightness() {
    return (Math.random() * (0.95 - 0.85) + 0.85).toFixed(2);
}

function getRandomHeight() {
    return Math.floor(Math.random() * (15 - 5 + 1)) + 5;
}

function createGrass() {
    const grass = document.createElement('div');
    grass.classList.add('grass');

    const left = getRandomPosition(window.innerWidth + 300);
    const top = getRandomPosition(window.innerHeight);
    const height = getRandomHeight();
    const brightness = getRandomBrightness();

    grass.style.left = `${left}px`;
    grass.style.top = `${top}px`;
    grass.style.height = `${height}px`;
    grass.style.filter = `brightness(${brightness})`;

    return grass;
}

function addGrasses() {
    const floor = document.querySelector('.floor');
    for (let i = 0; i < 5000; i++) {
        const grass = createGrass();
        floor.appendChild(grass);
    }
}

addGrasses();


/* ---------------------------------------------- Spring ---------------------------------------------- */

function createFlowerPetalsAndWindLines() {
    const springContainer = document.querySelector('.seasons');
    const numberOfPetals = 30;

    for (let i = 0; i < numberOfPetals; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.classList.add('flowerPetal');
            springContainer.appendChild(petal);

            const startPosX = window.innerWidth;
            const startPosY = 200 - Math.random() * window.innerHeight * 0.5;
            petal.style.left = startPosX + 'px';
            petal.style.top = startPosY + 'px';

            const petalRotation = (Math.random() * 50 - 130) + 'deg';

            const petalId = 'petalAnimation_' + i;

            let stylesheet = document.getElementById(petalId);
            if (!stylesheet) {
                stylesheet = document.createElement('style');
                stylesheet.id = petalId;
                document.head.appendChild(stylesheet);
            }

            stylesheet.sheet.insertRule(`@keyframes ${petalId} {
                0% {
                    transform: translate(0, 0) rotate(${petalRotation});
                }
                60% {
                    transform: translate(calc(-60vw), calc(60vh)) rotate(${petalRotation});
                }
                100% {
                    transform: translate(calc(-100vw - 20px), calc(100vh + 20px)) rotate(-50deg);
                }
            }`);

            const animationDuration = Math.random() * 3 + 5;
            petal.style.animation = `${petalId} linear ${animationDuration}s 1s`;
            
            if ( (i + 1) % 10 == 0) {
                const windLine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                windLine.setAttribute('viewBox', '0 0 600 600');
                windLine.setAttribute('class', 'windLine');
                windLine.setAttribute('width', '100%');
                windLine.setAttribute('height', '100%');
                windLine.style.left = startPosX + 'px';
                windLine.style.top = startPosY + 'px';

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', 'M 0 300 Q 150 200 300 300 Q 450 400 600 300 Q 750 200 900 300');

                windLine.appendChild(path);
                springContainer.appendChild(windLine);

                windLine.addEventListener('animationend', () => {
                    windLine.remove();
                });
            }
            
            petal.addEventListener('animationend', () => {
                petal.remove();
            });
        }, i * (numberOfPetals * 10));
    }
}

createFlowerPetalsAndWindLines();

function createFlowersFloor() {
    const floor = document.querySelector('.floor');
    const numberOfFlowers = 90;
    const colors = ['yellow', 'white', 'pink'];
    const darkerColors = ['#ffbf00', '#cac4ff', '#eb8394'];
    const pinkFrequency = 2;
    const pinkSizeMultiplier = 1.5;

    for (let i = 0; i < numberOfFlowers; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flowersFloor');

        flower.style.opacity = 0;

        const appearanceDelay = Math.random() * 3000;

        setTimeout(() => {
            flower.style.opacity = 1;
        }, appearanceDelay);

        const disappearanceDelay = Math.random() * 2050 + 13500;
        setTimeout(() => {
            flower.style.opacity = 0;
            const cloud1 = document.getElementById('cloud1');

            setTimeout(() => {
                flower.remove();
                cloud1.innerHTML = '';
            }, 500);
        }, disappearanceDelay);

        let randomColor, darkerColor;
        if (Math.random() < pinkFrequency / (colors.length - 1 + pinkFrequency)) {
            randomColor = 'pink';
            darkerColor = '#eb8394';
            if(i%2 == 0) {
                for (var j = 0; j < 5; j++) {
                    var petalDiv = document.createElement('div');
                    petalDiv.classList.add('flowersFloor');
                    petalDiv.style.background = 'inherit';
                    flower.appendChild(petalDiv);
                }
                flower.style.background = `radial-gradient(${darkerColor}, ${randomColor})`;
            } else {
                flower.style.width = 12 * pinkSizeMultiplier + 'px';
                flower.style.height = 12 * pinkSizeMultiplier + 'px';
                flower.style.background = `linear-gradient(to bottom, ${randomColor}, ${darkerColor})`;
                flower.style.zIndex = 2;
            }
        } else {
            randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];
            darkerColor = darkerColors[Math.floor(Math.random() * (darkerColors.length - 1))];
            for (var j = 0; j < 5; j++) {
                var petalDiv = document.createElement('div');
                petalDiv.classList.add('flowersFloor');
                petalDiv.style.background = 'inherit';
                flower.appendChild(petalDiv);
            }
            flower.style.background = `radial-gradient(${darkerColor}, ${randomColor})`;
        }

        const posX = Math.random() * floor.offsetWidth;
        const posY = Math.random() * floor.offsetHeight - 10;
        flower.style.left = posX + 'px';
        flower.style.top = posY + 'px';
        const flowerRotation = (Math.random() * 90) + 'deg';
        flower.style.transform = `rotate(${flowerRotation})`;
        floor.appendChild(flower);
    }
}

setTimeout(() => {
    createFlowersFloor();
}, 1000);

/* ---------------------------------------------- Summer ---------------------------------------------- */

const floor = document.querySelector('.floor');
const summer = document.querySelector('.summer');
const blanket = document.querySelector('.blanket');
const ball = document.querySelector('.ball');
const secondBall = document.querySelector('.second-ball');
let count = 0;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `${r}, ${g}, ${b}`;
}

function getRandomEndPosition() {
    const screenWidth = window.innerWidth - 100;
    return Math.floor(Math.random() * (screenWidth - ball.clientWidth));
}

function getRandomTopPosition() {
    return Math.floor(Math.random() * (50 + 1)) + 100;
}

function setRandomPositionAndColor(targetBall) {
    const newLeft = getRandomEndPosition();
    const newTop = getRandomTopPosition();
    const color = getRandomColor();
    targetBall.style.left = `${newLeft}px`;
    targetBall.style.top = `${newTop}%`;
    targetBall.style.border = `1px solid rgb(${color}, 0.9)`;
    targetBall.style.background = `radial-gradient(rgb(${color}, 0.5), rgb(${color}, 1))`;
    const minEndLeft = newLeft + 500;
    targetBall.style.setProperty('--end-left', `${Math.max(getRandomEndPosition(), minEndLeft)}px`);
}

function pauseAnimation(targetBall) {
    targetBall.style.animationPlayState = 'paused';
    targetBall.style.opacity = 0;
    setTimeout(() => {
        targetBall.style.animationPlayState = 'running';
        targetBall.style.opacity = 1;
    }, 1000);
}

function createBlanket(left, top) {
    const blanket = document.createElement('div');
    blanket.classList.add('blanket');
    blanket.style.top = `${top}%`;
    blanket.style.left = `${left}%`;
    blanket.style.opacity = 1;

    return blanket;
}

function addBlankets() {
    for (let i = 0; i < 4; i++) {
        let blanket;
        if (i % 2 === 0) {
            blanket = createBlanket(25 + (i * 15 + i* 5), 90 - (i * 2));
            blanket.style.width = '250px';
            blanket.style.height = '130px';
            if (i % 4 === 0) {
                blanket.style.background = `
                    linear-gradient(135deg, #009eb3 25%, transparent 25%) -15px 0,
                    linear-gradient(225deg, #009eb3 25%, transparent 25%) -15px 0,
                    linear-gradient(315deg, #009eb3 25%, transparent 25%),
                    linear-gradient(45deg, #009eb3 25%, transparent 25%)`;
                blanket.style.backgroundSize = '30px 30px';
                blanket.style.backgroundColor = '#46d4cd';
            } else {
                blanket.style.setProperty('--main-color-blanket', '#f036a8');
                blanket.style.setProperty('--secondary-color-blanket', '#ff94da');
            } 
        } else {
            blanket = createBlanket(25 + (i * 15 + i* 5), 75 + (i * 2));
            if (i % 3 === 0) {
                blanket.style.transform = "scaleX(-1)";
                blanket.style.setProperty('--main-color-blanket', '#58d446');
                blanket.style.setProperty('--secondary-color-blanket', '#16b300');
            } else {
                blanket.style.backgroundColor = '#eac500';
                blanket.style.backgroundImage = 'linear-gradient(90deg, #fffc4480 50%, transparent 50%), linear-gradient(#fffc4480 50%, transparent 50%)';
                blanket.style.backgroundSize = '13px 13px';
            } 
        }

        summer.appendChild(blanket);

        const disappearanceDelay = Math.random() * 2050 + 13500;
        setTimeout(() => {
            blanket.style.opacity = 0;

            setTimeout(() => {
                blanket.remove();
            }, 500);
        }, disappearanceDelay);
    }
}

setTimeout(() => {
    floor.style.background = "#83a132";
    document.body.style.background = "linear-gradient(to bottom, #b3e1ff, #ffc374)";

    const grasses = document.querySelectorAll('.grass');
    grasses.forEach(grass => {
        grass.style.background = '#83a132';
    });

    const cloud2 = document.getElementById('cloud2');
    cloud2.innerHTML = 'Summer';
    cloud2.style.color = "#fffc44";
    cloud2.style.textShadow = "-1px -1px 0 #eac500, 1px -1px 0 #eac500, -1px 1px 0 #eac500, 1px 1px 0 #eac500";

    ball.style.opacity = 1;
    ball.style.animationPlayState = 'running';
    secondBall.style.opacity = 1;
    secondBall.style.animationPlayState = 'running';
    blanket.style.opacity = 1;
    addBlankets();

    ball.addEventListener('animationiteration', (event) => {
        if (event.elapsedTime % 2 === 0) { 
            setRandomPositionAndColor(ball);
            pauseAnimation(ball);
            count++;

            if (count % 5 === 0) {
                secondBall.style.opacity = 1;
                secondBall.style.animationPlayState = 'running';
                setRandomPositionAndColor(secondBall);
                pauseAnimation(secondBall);
            } else {
                secondBall.style.opacity = 0;
                secondBall.style.animationPlayState = 'paused';
            }
        }
    });

    const disappearanceDelay = Math.random() * 2050 + 13500;
        setTimeout(() => {
            ball.style.opacity = 0;
            secondBall.style.opacity = 0;
            blanket.style.opacity = 0;

            setTimeout(() => {
                ball.remove();
                secondBall.remove();
                blanket.remove();
                cloud2.innerHTML = '';
            }, 500);
        }, disappearanceDelay);
}, 17000); //17secs
