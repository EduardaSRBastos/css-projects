window.addEventListener('DOMContentLoaded', function() {
    var numberOfStars = 300;
    var stars = [];

    for (var i = 0; i < numberOfStars; i++) {
        var starWrap = document.createElement('div');
        starWrap.className = 'star-wrap';

        var star = document.createElement('div');
        star.className = 'star';
        
        var size = Math.random() * 8 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        if (i % 2 === 0) {
            star.style.backgroundColor = 'rgb(255, 239, 186)';
        } else {
            star.style.backgroundColor = 'white';
        }

        starWrap.appendChild(star);

        starWrap.style.filter = 'drop-shadow(1px 1px 5px white)';

        document.getElementById('starContainer').appendChild(starWrap);

        stars.push(star);
    }
    setInterval(function() {
        for (var i = 0; i < stars.length; i++) {
            if (Math.random() > 0.5) {
                stars[i].style.opacity = '0';
            } else {
                stars[i].style.opacity = '1';
            }
        }
    }, 1000);

    function calculateDistance(star1, star2) {
        const x1 = parseInt(star1.style.left) + parseInt(star1.style.width) / 2;
        const y1 = parseInt(star1.style.top) + parseInt(star1.style.height) / 2;
        const x2 = parseInt(star2.style.left) + parseInt(star2.style.width) / 2;
        const y2 = parseInt(star2.style.top) + parseInt(star2.style.height) / 2;
    
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    function createConstellation(stars) {
        const thresholdDistance = 50;
        const constellationsToRemove = [];
    
        for (let i = 0; i < stars.length; i++) {
            let numLines = 0;
            const star1 = stars[i];
            const lines = [];
    
            for (let j = i + 1; j < stars.length; j++) {
                const star2 = stars[j];
                const distance = calculateDistance(star1, star2);
    
                if (distance < thresholdDistance) {
                    const line = document.createElement('div');
                    line.className = 'constellation-line';
                    line.style.position = 'absolute';
                    line.style.width = distance + 'px';
                    line.style.height = '1px';
                    line.style.backgroundColor = 'white';
                    line.style.opacity = '0.5';
                    line.style.left = (parseInt(star1.style.left) + parseInt(star1.style.width) / 2) + 'px';
                    line.style.top = (parseInt(star1.style.top) + parseInt(star1.style.height) / 2) + 'px';
                    line.style.transformOrigin = 'top left';
                    line.style.transform = 'rotate(' + (Math.atan2(parseInt(star2.style.top) - parseInt(star1.style.top), parseInt(star2.style.left) - parseInt(star1.style.left)) * 180 / Math.PI) + 'deg)';
                    line.style.transition = "opacity 2s ease-in-out";
    
                    document.getElementById('starContainer').appendChild(line);
    
                    numLines++;
                    lines.push(line);
                }
            }
            if (numLines <= 2) {
                constellationsToRemove.push(...lines);
            }
        }
        constellationsToRemove.forEach(line => line.remove());
    
        setInterval(function() {
            const lines = document.querySelectorAll('.constellation-line');
            lines.forEach(line => {
                if (Math.random() > 0.5) {
                    line.style.opacity = '0.1';
                } else {
                    line.style.opacity = '0.5';
                }
            });
        }, 1000);
    }
    createConstellation(stars);

    function createShootingStar() {
        var shootingStarWrap = document.createElement('div');
        shootingStarWrap.className = 'shooting-star-wrap';
    
        var shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';

        var minSize = 30;
        var maxSize = 60;

        var size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        shootingStar.style.width = size + 'px';
        shootingStar.style.height = (size / 2) + 'px';
    
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
    
        shootingStar.style.left = x + 'px';
        shootingStar.style.top = y + 'px';
    
        shootingStarWrap.appendChild(shootingStar);
    
        shootingStarWrap.style.filter = 'drop-shadow(-1px -1px 5px white)';
    
        document.querySelector('.shootingContainer').appendChild(shootingStarWrap);
    }
    
    function createRandomShootingStarsGroup() {
        var numberOfShootingStars = 4;
        var minDelay = 2000;
        var maxDelay = 5000;
        var delayArray = [];
    
        for (var i = 0; i < numberOfShootingStars; i++) {
            var delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            delayArray.push(delay);
        }
    
        delayArray.sort(function(a, b) {
            return a - b;
        });
    
        for (var j = 0; j < numberOfShootingStars; j++) {
            setTimeout(createShootingStar, delayArray[j]);
        }
    }
    
    function createShootingStarGroups() {
        createRandomShootingStarsGroup();
        setInterval(createRandomShootingStarsGroup, 6000);
    }
    setTimeout(createShootingStarGroups, 3000);
    
    function darkenColor(color) {
        var r = parseInt(color.substring(1, 3), 16);
        var g = parseInt(color.substring(3, 5), 16);
        var b = parseInt(color.substring(5, 7), 16);
    
        r = Math.floor(r * 0.8);
        g = Math.floor(g * 0.8);
        b = Math.floor(b * 0.8);
    
        var darkColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    
        return darkColor;
    }

    function createCloud(className, transform, left, top, zIndex, backgroundColor) {
        var cloud = document.createElement('div');
        cloud.className = 'cloud ' + className;
        cloud.style.transform = transform;
        cloud.style.left = left;
        cloud.style.top = top;
        cloud.style.zIndex = zIndex;
        cloud.style.background = "linear-gradient(to bottom, " + backgroundColor + " 50%, " + darkenColor(backgroundColor) + " 100%)";

        var before = document.createElement('div');
        before.className = 'cloud-before';
        before.style.position = 'absolute';
        before.style.background = "linear-gradient(to bottom, " + backgroundColor + " 50%, transparent 100%)";
        before.style.zIndex = 1;
    
        var after = document.createElement('div');
        after.className = 'cloud-after';
        after.style.position = 'absolute';
        after.style.background = "linear-gradient(to bottom, " + backgroundColor + " 50%, transparent 100%)";

        if (className == "large") {
            before.style.width = '286px';
            before.style.height = '312px';
            before.style.top = '-130px';
            before.style.left = '130px';
            before.style.borderRadius = '260px';
        
            after.style.width = '442px';
            after.style.height = '468px';
            after.style.top = '-234px';
            after.style.right = '130px';
            after.style.borderRadius = '520px';
        } else {
            before.style.width = '220px';
            before.style.height = '240px';
            before.style.top = '-100px';
            before.style.left = '100px';
            before.style.borderRadius = '200px';
        
            after.style.width = '340px';
            after.style.height = '360px';
            after.style.top = '-180px';
            after.style.right = '100px';
            after.style.borderRadius = '400px';
        }
        
        cloud.appendChild(before);
        cloud.appendChild(after);
        document.body.appendChild(cloud);
    }
    createCloud('', 'scaleX(-1)', '30%', '80%', 6, '#f9fcff');
    createCloud('', 'scaleX(1)', '75%', '80%', 6, '#f9fcff');
    createCloud('large', 'scaleX(-1)', '-5%', '70%', 5, '#f2f9fe');
    createCloud('', 'scaleX(-1)', '', '', 4, '#e3e8eb');
    createCloud('', 'scaleX(1)', '70%', '40%', 4, '#e3e8eb');
    createCloud('large', '', '70%', '', 5, '#f2f9fe');
    createCloud('large', 'scaleX(-1)', '20%', '30%', 3, '#c5cfd6');
    createCloud('large', 'scaleX(1)', '50%', '20%', 2, '#bac5ce');
    createCloud('', 'scaleX(-1)', '-5%', '35%', 2, '#bac5ce');
    createCloud('large', 'scaleX(-1)', '-5%', '20%', 1, '#a6b4be');

    var clouds = document.querySelectorAll('.cloud');
    clouds.forEach(function(cloud) {
        if (cloud.style.transform === 'scaleX(-1)') {
            cloud.classList.add('moveLeftAnimation');
        } else {
            cloud.classList.add('moveRightAnimation');
        }
    });  

    const movingStarContainer = document.getElementById('movingStarContainer');
    for (let i = 0; i < 100; i++) {
        const movingStar = document.createElement('div');
        movingStar.classList.add('movingStar');

        if (i % 4 === 0) {
            movingStar.classList.add('delayed');
        } else if (i % 4 === 1) {
            movingStar.classList.add('delayed2');
        } else if (i % 4 === 2) {
            movingStar.classList.add('delayed3');
        }

        var size = Math.random() * 5 + 1;
        movingStar.style.width = size + 'px';
        movingStar.style.height = size + 'px';
        movingStar.style.left = Math.random() * window.innerWidth + 'px';
        movingStar.style.top = Math.random() * window.innerHeight + 'px';
        movingStarContainer.appendChild(movingStar);
    }
});

let moonPhase = 0;
function animateMoon() {
    const moonPhaseElement = document.querySelector('.moonPhase');
    moonPhaseElement.style.opacity = 1;

    switch (moonPhase) {
        case 0: //Middle Left
            moonPhaseElement.style.left = "0%";
            break;
        case 1: //Middle Left
            moonPhaseElement.style.left = "25%";
            break;
        case 2: //Middle
            moonPhaseElement.style.left = "50%";
            break;
        case 3: //Middle Right
            moonPhaseElement.style.left = "75%";
            break;
        case 4: //Middle Right
            moonPhaseElement.style.left = "100%";
            break;
        case 5: //New Moon
            moonPhaseElement.style.left = "150%";
            setTimeout(() => {
                moonPhaseElement.style.opacity = 0;
                moonPhaseElement.style.left = '-50%';
            }, 900);
            break;
    }

    moonPhase = (moonPhase + 1) % 6;
}

let zoomTimer;
function startZoom() {
    zoomTimer = setTimeout(() => {
        document.querySelector('.moon').classList.add('zoomed');
        document.querySelector('.astronaut').classList.add('zoomed');
        document.querySelector('.zoomedText').classList.add('zoomed');
    }, 5000);
}

function stopZoom() {
    clearTimeout(zoomTimer);
    document.querySelector('.moon').classList.remove('zoomed');
    document.querySelector('.astronaut').classList.remove('zoomed');
    document.querySelector('.zoomedText').classList.remove('zoomed');
}