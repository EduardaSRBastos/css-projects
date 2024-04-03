const base = document.querySelector('.base');

let currentRotationX = 75;
let currentRotationY = 3;
let currentRotationZ = 60;
const maxRotationZ = 130;
const minRotationZ = 45;

document.addEventListener('mousedown', (event) => {
    if (event.button === 1 || event.button === 2) {
        event.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});

function onMouseMove(event) {
    currentRotationZ += event.movementX / 10;
    currentRotationZ = Math.min(Math.max(currentRotationZ, minRotationZ), maxRotationZ);
    base.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) rotateZ(${currentRotationZ}deg)`;
}

function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomGreenColor() {
    const red = Math.floor(getRandomNumber(0, 100));
    const green = Math.floor(getRandomNumber(100, 256));
    const blue = Math.floor(getRandomNumber(0, 100));

    return `rgb(${red}, ${green}, ${blue})`;
}

for (let i = 0; i < 4000; i++) {
    const grass = document.createElement('div');
    grass.classList.add('grass');

    const quadrant = i % 4;
    let randomTop, randomLeft;

    switch (quadrant) {
        case 0: // Top-left
            randomTop = getRandomNumber(57, 103);
            randomLeft = getRandomNumber(-5, 30);
            grass.style.backgroundColor = '#598314';
            grass.style.borderRight = 'solid 3px #7ca115';
            grass.style.height = '12px';
            break;
        case 1: // Top-right
            randomTop = getRandomNumber(-5, 38);
            randomLeft = getRandomNumber(-5, 30);
            grass.style.backgroundColor = '#14834c';
            grass.style.borderRight = 'solid 3px #15a154';
            grass.style.height = '15px';
            break;
        case 2: // Bottom-left
            randomTop = getRandomNumber(65, 103);
            randomLeft = getRandomNumber(62, 104);
            break;
        case 3: // Bottom-right
            randomTop = getRandomNumber(-5, 34);
            randomLeft = getRandomNumber(62, 104);
            break;
    }

    if (i % 5 == 0) {
        randomTop = getRandomNumber(40, 56);
        randomLeft = getRandomNumber(-5, 31);
        grass.style.height = '10px';
    }

    grass.style.top = `${randomTop}%`;
    grass.style.left = `${randomLeft}%`;
    grass.style.backgroundColor = getRandomGreenColor();

    base.appendChild(grass);
}

const leftHouseEntrance = document.querySelector('.leftHouseEntrance');
const rightHouseEntrance = document.querySelector('.rightHouseEntrance');
const grassElements = document.querySelectorAll('.grass');

grassElements.forEach(grass => {
    const grassRect = grass.getBoundingClientRect();
    const leftEntranceRect = leftHouseEntrance.getBoundingClientRect();
    const rightEntranceRect = rightHouseEntrance.getBoundingClientRect();

    if (
        (
            (grassRect.right - 22) >= leftEntranceRect.left &&
            (grassRect.left + 22) <= leftEntranceRect.right &&
            (grassRect.bottom - 16) >= leftEntranceRect.top &&
            (grassRect.top + 16) <= leftEntranceRect.bottom
        ) ||
        (
            (grassRect.right - 20) >= rightEntranceRect.left &&
            (grassRect.left + 20) <= rightEntranceRect.right &&
            (grassRect.bottom - 18) >= rightEntranceRect.top &&
            (grassRect.top + 18) <= rightEntranceRect.bottom
        )
    ) {
        grass.style.opacity = '0';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const houses = document.querySelectorAll('.bottomHouse');
    let isTransparent = false;
    houses.forEach(function(house) {
        house.addEventListener('click', function() {
            const houseElements = document.querySelectorAll('.bottomHouseWall, .bottomHouseRoofSide');
            houseElements.forEach(function(element) {
                if (isTransparent) {
                    element.style.opacity = '1';
                } else {
                    element.style.opacity = '0.2';
                }
            });
            isTransparent = !isTransparent;
        });
    });
});