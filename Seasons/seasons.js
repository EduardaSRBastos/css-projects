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

function createFallingRain() {
    const springContainer = document.querySelector('.spring');
    const numberOfRainDrops = 100;
    const rainColors = ['white', '#e0e6ff', '#e6e7eb'];

    for (let i = 0; i < numberOfRainDrops; i++) {
        setTimeout(() => {
            const rain = document.createElement('div');
            rain.classList.add('rain');

            const rainColor = rainColors[Math.floor(Math.random() * rainColors.length)];
            rain.style.left = Math.random() * 100 + '%';
            rain.style.top = Math.random() * -1 - 10 + '%';
            rain.style.height = Math.random() * 10 + 50 + 'px';
            rain.style.background = rainColor;
            rain.style.opacity = Math.random() * 0.5 + 0.5;
            rain.style.zIndex = 0;
            const duration = Math.random() * 1 + 2 + 's';
            rain.style.animation = `fall ${duration} linear forwards`;
            springContainer.appendChild(rain);

            const disappearanceDelay = Math.random() * 2050 + 13500;
            setTimeout(() => {
                rain.style.opacity = 0;
                setTimeout(() => {
                    rain.remove();
                }, 500);
            }, disappearanceDelay);
        }, i * (numberOfRainDrops));
    }
}

function createFlowerPetalsAndWindLines() {
    const springContainer = document.querySelector('.spring');
    const numberOfPetals = 30;

    for (let i = 0; i < numberOfPetals; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.classList.add('flowerPetal');
            springContainer.appendChild(petal);

            const startPosX = window.innerWidth;
            const startPosY = 400 - Math.random() * window.innerHeight * 0.5;
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
                    transform: translate(calc(-60vw), calc(40vh)) rotate(${petalRotation});
                }
                100% {
                    transform: translate(calc(-100vw - 20px), calc(70vh + 20px)) rotate(-50deg);
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
    createFallingRain();
}, 1000);


/* ---------------------------------------------- Summer ---------------------------------------------- */

const floor = document.querySelector('.floor');
const floorWidth = floor.offsetWidth;
const floorHeight = floor.offsetHeight;
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
    targetBall.style.background = `radial-gradient(rgb(${color}, 0.7), rgb(${color}, 1))`;
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

    const appearanceDelay = Math.random() * 3000;
    setTimeout(() => {
        blanket.style.opacity = 1;
    }, appearanceDelay);

    return blanket;
}

function addBlankets() {
    for (let i = 0; i < 4; i++) {
        let blanket;
        if (i % 2 === 0) {
            blanket = createBlanket(25 + (i * 15 + i* 5), 85 - (i * 2));
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
                blanket.style.transform = "scaleX(-1) perspective(300px) rotateX(30deg)";
                blanket.style.setProperty('--main-color-blanket', '#58d446');
                blanket.style.setProperty('--secondary-color-blanket', '#16b300');
            } else {
                blanket.style.backgroundColor = '#eac500';
                blanket.style.backgroundImage = 'linear-gradient(90deg, #fffc4480 50%, transparent 50%), linear-gradient(#fffc4480 50%, transparent 50%)';
                blanket.style.backgroundSize = '13px 13px';
            } 
        }

        summer.appendChild(blanket);

        const disappearanceDelay = Math.random() * 2050 + 14000;
        setTimeout(() => {
            blanket.style.opacity = 0;
            setTimeout(() => {
                blanket.remove();
            }, 500);
        }, disappearanceDelay);
    }
}

function createBird(number) {
    const bird = document.createElement('div');
    bird.classList.add('bird');
    bird.style.opacity = 0.8;

    if(number % 2 == 0) {
        bird.style.animation = "movingWings 1s linear infinite alternate, birdMovingMirrored 7s linear forwards";
    }

    summer.appendChild(bird);
    const disappearanceDelay = Math.random() * 2050 + 14500;
        setTimeout(() => {
            bird.style.opacity = 0;
            setTimeout(() => {
                bird.remove();
            }, 500);
        }, disappearanceDelay);
}
  
function createBirds() {
    for (let i = 1; i <= 3; i++) {
        const appearanceDelay = (Math.random() * (1000 - 500)) + 1000;
        setTimeout(() => {
            createBird(i);
        }, i * 2500 + appearanceDelay);
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
    createBirds();

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

    const disappearanceDelay = 14600;
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
}, 17000); // 17secs


/* ---------------------------------------------- Fall ---------------------------------------------- */

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

function createMushrooms() {
    const capColors = ['#ba8b5b', '#f5e1ce', '#e0ad36', '#c40303'];
    const stemColors = ['#f5dbdb', '#baa582', '#d19e7b', '#ccc197'];
    const numberOfMushrooms = 20;
    const mushroomsPerColor = numberOfMushrooms / capColors.length;

    for (let i = 0; i < numberOfMushrooms; i++) {
      const mushroom = document.createElement('div');
      mushroom.classList.add('mushroom');
      
       const mushroomWidth = getRandom(18, 35);
       const mushroomHeight = getRandom(9, 18);
       mushroom.style.width = `${mushroomWidth}px`;
       mushroom.style.height = `${mushroomHeight}px`;
       mushroom.style.borderRadius = `${mushroomHeight}px ${mushroomHeight}px 2px 2px`;

       const colorIndex = Math.floor(i / mushroomsPerColor);
       mushroom.style.backgroundColor = capColors[colorIndex];

       const stemWidth = getRandom(4, 10);
       const stemHeight = getRandom(8, 20);

       const stemColorIndex = Math.floor(i / mushroomsPerColor);
       mushroom.style.setProperty('--stem-color', stemColors[stemColorIndex]);
       
       mushroom.style.setProperty('--stem-width', `${stemWidth}px`);
       mushroom.style.setProperty('--stem-height', `${stemHeight}px`);
 
       const randomLeft = Math.random() * (floorWidth);
       const randomTop = Math.random() * (floorHeight);
       
       mushroom.style.left = `${randomLeft}px`;
       mushroom.style.top = `${randomTop}px`;
       
       const appearanceDelay = Math.random() * 3000;
       setTimeout(() => {
            mushroom.style.opacity = 1;
       }, appearanceDelay);

       const disappearanceDelay = Math.random() * 2050 + 13500;
        setTimeout(() => {
            mushroom.style.opacity = 0;
            setTimeout(() => {
                mushroom.remove();
            }, 500);
        }, disappearanceDelay);

      floor.appendChild(mushroom);
    }
}

function createLeaves() {
    const leafColors = ['#476e13', '#a15005', '#b01f0c', '#dbca09'];
    const numberOfLeaves = 30;
    const leavesPerColor = numberOfLeaves / leafColors.length;

    for (let i = 0; i < numberOfLeaves; i++) {
        const leafGroup = document.createElement('div');
        leafGroup.classList.add('leaf-group');
        leafGroup.style.left = `${Math.random() * (floorWidth)}px`;
        leafGroup.style.top = `${Math.random() * (floorHeight)}px`;
        leafGroup.style.rotate = `${getRandom(0, 360)}deg`;
        
        const colorIndex = Math.floor(i / leavesPerColor);
        const leafColor = leafColors[colorIndex];

        for (let j = 0; j < 3; j++) {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf');
            leaf.style.background = `linear-gradient(to bottom, ${leafColor}, #ab9750)`;
            leafGroup.appendChild(leaf);
        }

        const appearanceDelay = Math.random() * 3000;
        setTimeout(() => {
            leafGroup.style.opacity = 1;
        }, appearanceDelay);

        const disappearanceDelay = Math.random() * 2050 + 13500;
        setTimeout(() => {
            leafGroup.style.opacity = 0;
            setTimeout(() => {
                leafGroup.remove();
            }, 500);
        }, disappearanceDelay);

        floor.appendChild(leafGroup);
    }
}

function createFlyingLeaves() {
    const fallContainer = document.querySelector('.fall');
    const numberOfLeaves = 30;
    const leafColors = ['#476e13', '#a15005', '#b01f0c', '#dbca09'];

    for (let i = 0; i < numberOfLeaves; i++) {
        setTimeout(() => {
            const leafGroup = document.createElement('div');
            leafGroup.classList.add('leaf-group');
            fallContainer.appendChild(leafGroup);

            const startPosX = window.innerWidth + 50;
            const startPosY = 400 - Math.random() * window.innerHeight * 0.5;
            leafGroup.style.left = startPosX + 'px';
            leafGroup.style.top = startPosY + 'px';
            leafGroup.style.opacity = 1;
            leafGroup.style.scale = 1.4;

            const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];

            for (let j = 0; j < 3; j++) {
                const leaf = document.createElement('div');
                leaf.classList.add('leaf');
                leaf.style.background = `linear-gradient(to bottom, ${leafColor}, #ab9750)`;
                leafGroup.appendChild(leaf);
            }

            const leafId = 'leafAnimation_' + i;
            const leafRotation = (Math.random() * 50 - 130) + 'deg';

            let stylesheet = document.getElementById(leafId);
            if (!stylesheet) {
                stylesheet = document.createElement('style');
                stylesheet.id = leafId;
                document.head.appendChild(stylesheet);
            }

            stylesheet.sheet.insertRule(`@keyframes ${leafId} {
                0% {
                    transform: translate(0, 0) rotate(${leafRotation});
                }
                60% {
                    transform: translate(calc(-60vw), calc(40vh)) rotate(${leafRotation});
                }
                100% {
                    transform: translate(calc(-100vw - 20px), calc(70vh + 20px)) rotate(-50deg);
                }
            }`);

            const animationDuration = Math.random() * 3 + 5;
            leafGroup.style.animation = `${leafId} linear ${animationDuration}s 1s`;
            
            leafGroup.addEventListener('animationend', () => {
                leafGroup.remove();
            });
        }, i * (numberOfLeaves * 10));
    }
}

setTimeout(() => {
    floor.style.background = "#6d7829";
    document.body.style.background = "linear-gradient(to bottom, #abbac2, #e8c384)";

    const grasses = document.querySelectorAll('.grass');
    grasses.forEach(grass => {
        grass.style.background = '#6d7829';
    });

    const cloud3 = document.getElementById('cloud3');
    cloud3.innerHTML = 'Fall';
    cloud3.style.color = "#c40303";
    cloud3.style.textShadow = "-1px -1px 0 #b01f0c, 1px -1px 0 #b01f0c, -1px 1px 0 #b01f0c, 1px 1px 0 #b01f0c";

    createMushrooms();
    createLeaves();
    createFlyingLeaves();
    
    const disappearanceDelay = Math.random() * 2050 + 13500;
        setTimeout(() => {
            cloud3.innerHTML = '';
        }, disappearanceDelay);
}, 34000); // 34secs


/* ---------------------------------------------- Winter ---------------------------------------------- */

function createFlyingSnow() {
    const winterContainer = document.querySelector('.winter');
    const numberOfSnowFlakes = 40;
    const snowColors = ['white', '#e0e6ff', '#fffce6'];

    for (let i = 0; i < numberOfSnowFlakes; i++) {
        setTimeout(() => {
            const snow = document.createElement('div');
            snow.classList.add('snow');
            winterContainer.appendChild(snow);

            const startPosX = window.innerWidth + 200;
            const startPosY = 300 - Math.random() * window.innerHeight * 0.5;
            const snowColor = snowColors[Math.floor(Math.random() * snowColors.length)];
            snow.style.left = startPosX + 'px';
            snow.style.top = startPosY + 'px';
            snow.innerHTML = "&#10052";
            snow.style.fontSize = Math.random() * 50 + 20 + 'px';
            snow.style.color = snowColor;
            snow.style.zIndex = 2;

            const snowId = 'snowAnimation_' + i;
            const snowRotation = (Math.random() * 50 - 130) + 'deg';

            let stylesheet = document.getElementById(snowId);
            if (!stylesheet) {
                stylesheet = document.createElement('style');
                stylesheet.id = snowId;
                document.head.appendChild(stylesheet);
            }

            stylesheet.sheet.insertRule(`@keyframes ${snowId} {
                0% {
                    transform: translate(0, 0) rotate(${snowRotation});
                }
                60% {
                    transform: translate(calc(-70vw), calc(40vh)) rotate(${snowRotation});
                }
                100% {
                    transform: translate(calc(-110vw - 20px), calc(70vh + 20px)) rotate(-50deg);
                }
            }`);

            const animationDuration = Math.random() * 3 + 5;
            snow.style.animation = `${snowId} linear ${animationDuration}s 1s`;
            
            snow.addEventListener('animationend', () => {
                snow.remove();
            });
        }, i * (numberOfSnowFlakes * 4));
    }
}

function createFallingSnow() {
    const winterContainer = document.querySelector('.winter');
    const numberOfSnowFlakes = 50;
    const snowColors = ['white', '#e0e6ff', '#fffce6'];

    for (let i = 0; i < numberOfSnowFlakes; i++) {
        setTimeout(() => {
            const snow = document.createElement('div');
            snow.classList.add('snow');

            const snowColor = snowColors[Math.floor(Math.random() * snowColors.length)];
            snow.style.left = Math.random() * 100 + '%';
            snow.style.top = Math.random() * -1 - 10 + '%';
            snow.innerHTML = "&#10052";
            snow.style.fontSize = Math.random() * 15 + 10 + 'px';
            snow.style.color = snowColor;
            snow.style.filter = "brightness(0.9)";
            snow.style.zIndex = 0;
            const duration = Math.random() * 5 + 7 + 's';
            snow.style.animation = `fall ${duration} linear forwards, sway ${duration} linear forwards`;
            winterContainer.appendChild(snow);

            const disappearanceDelay = Math.random() * 2050 + 14500;
            setTimeout(() => {
                snow.style.opacity = 0;
                setTimeout(() => {
                    snow.remove();
                }, 500);
            }, disappearanceDelay);
        }, i * (numberOfSnowFlakes * 2.5));
    }
}

function createSnow() {
    const snowColors = ['white', '#e0e6ff', '#fffce6'];
    const numberOfSnowFlakes = 50;

    for (let i = 0; i < numberOfSnowFlakes; i++) {
        const snow = document.createElement('div');
        snow.classList.add('snow');

        const snowColor = snowColors[Math.floor(Math.random() * snowColors.length)];
        snow.innerHTML = "&#10052";
        snow.style.fontSize = Math.random() * 20 + 10 + 'px';
        snow.style.color = snowColor;
        snow.style.filter = "brightness(0.95)";
        snow.style.zIndex = 2;

        const randomLeft = Math.random() * (floorWidth);
        const randomTop = Math.random() * (floorHeight);
        
        snow.style.left = `${randomLeft}px`;
        snow.style.top = `${randomTop}px`;
        
        const appearanceDelay = Math.random() * 3000;
        setTimeout(() => {
            snow.style.opacity = 1;
        }, appearanceDelay);

        const disappearanceDelay = Math.random() * 2050 + 13500;
            setTimeout(() => {
                snow.style.opacity = 0;
                setTimeout(() => {
                    snow.remove();
                }, 500);
            }, disappearanceDelay);

        floor.appendChild(snow);
    }
}

function getRandomBrightness(min, max) {
    return Math.random() * (max - min) + min;
}

function createSnowman() {
    const snowmanWidth = 150;
    const snowmanHeight = 1;
    const gap = 120;

    const containerWidth = floor.offsetWidth;
    const containerHeight = floor.offsetHeight;

    const numCols = Math.floor(containerWidth / (snowmanWidth + gap));
    const numRows = Math.floor(containerHeight / (snowmanHeight + gap));

    const verticalPadding = 10;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const snowmanContainer = document.createElement('div');
            snowmanContainer.classList.add('snowmanContainer');

            const snowBall1 = document.createElement('div');
            snowBall1.classList.add('snowBall');
            snowBall1.innerHTML = `
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="nose"></div>
                <div class="mouth"></div>
            `;

            const snowBall2 = document.createElement('div');
            snowBall2.classList.add('snowBall');
            snowBall2.innerHTML = `
                <div class="button" style="top: 12px;"></div>
                <div class="button" style="top: 22px;"></div>
                <div class="button" style="top: 32px;"></div>
                <div class="arm"></div>
                <div class="arm"></div>
            `;

            applyRandomBrightness(snowBall1);
            applyRandomBrightness(snowBall2);

            snowmanContainer.appendChild(snowBall1);
            snowmanContainer.appendChild(snowBall2);

            const posX = col * (snowmanWidth + gap);
            let posY = row * (snowmanHeight + gap);
            
            if (Math.random() < 0.5) {
                posY -= Math.random() * gap * 0.5;
            } else {
                posY += Math.random() * gap * 0.5;
            }

            posY = Math.max(verticalPadding, Math.min(containerHeight - snowmanHeight - verticalPadding, posY));

            snowmanContainer.style.left = `${posX}px`;
            snowmanContainer.style.top = `${posY}px`;

            const randomScale = getRandom(0.8, 1);
            snowmanContainer.style.transform = `scale(${randomScale})`;

            const appearanceDelay = Math.random() * 3000;
            setTimeout(() => {
                snowmanContainer.style.opacity = 1;
            }, appearanceDelay);

            const disappearanceDelay = Math.random() * 2050 + 13500;
            setTimeout(() => {
                snowmanContainer.style.opacity = 0;
                setTimeout(() => {
                    snowmanContainer.remove();
                }, 500);
            }, disappearanceDelay);

            floor.appendChild(snowmanContainer);
        }
    }
}

function applyRandomBrightness(element) {
    const randomBrightness = getRandomBrightness(0.9, 1.8);
    const buttons = element.querySelectorAll('.button');
    buttons.forEach(button => {
        button.style.filter = `brightness(${randomBrightness})`;
    });

    const eyes = element.querySelectorAll('.eye');
    eyes.forEach(eye => {
        eye.style.filter = `brightness(${randomBrightness})`;
    });

    const mouth = element.querySelectorAll('.mouth');
    mouth.forEach(mouth => {
        mouth.style.filter = `brightness(${randomBrightness})`;
    });

    const arms = element.querySelectorAll('.arm');
    arms.forEach(arm => {
        arm.style.filter = `brightness(${randomBrightness})`;
    });
}

setTimeout(() => {
    floor.style.background = "#e1e3f0";
    document.body.style.background = "linear-gradient(to bottom, #a9b0cf, #dce2fc)";

    const grasses = document.querySelectorAll('.grass');
    grasses.forEach(grass => {
        grass.style.background = '#e1e3f0';
    });

    const cloud4 = document.getElementById('cloud4');
    cloud4.innerHTML = 'Winter';
    cloud4.style.color = "#bac5f5";
    cloud4.style.textShadow = "-1px -1px 0 #8c95bd, 1px -1px 0 #8c95bd, -1px 1px 0 #8c95bd, 1px 1px 0 #8c95bd";

    createFlyingSnow();
    createFallingSnow();
    createSnowman();
    createSnow();
    
    const disappearanceDelay = Math.random() * 2050 + 15500;
        setTimeout(() => {
            cloud4.innerHTML = '';
        }, disappearanceDelay);
}, 51000); // 51secs