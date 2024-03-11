var moveAmount = 350; 

function moveDownStrawberry() {
    document.querySelector('.chocolate').style.top = '0';
    document.querySelector('.chocolate').style.left = '0';
    document.querySelector('.carrot').style.top = '0';
    document.querySelector('.carrot').style.left = '0';
    document.querySelector('.vanilla').style.top = '0';
    document.querySelector('.vanilla').style.left = '0';

    var strawberry = document.querySelector('.strawberry');
    var cake = document.querySelector('.cake');
    var topCurrentPosition = parseFloat(getComputedStyle(strawberry).top);
    var leftCurrentPosition = parseFloat(getComputedStyle(strawberry).left);

    if (topCurrentPosition >= moveAmount) {
        strawberry.style.top = '0';
        strawberry.style.left = '0';
        cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(250, 206, 86)";
    } else {
        strawberry.style.top = topCurrentPosition + moveAmount + 'px';
        strawberry.style.left = leftCurrentPosition + 33 + '%';

        strawberry.addEventListener('transitionend', function() {
            topCurrentPosition = parseFloat(getComputedStyle(strawberry).top);
            
            if (topCurrentPosition >= moveAmount) {
                cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(240, 101, 101)";
            }
        });
    }
}

function moveDownChocolate() {
    document.querySelector('.strawberry').style.top = '0';
    document.querySelector('.strawberry').style.left = '0';
    document.querySelector('.carrot').style.top = '0';
    document.querySelector('.carrot').style.left = '0';
    document.querySelector('.vanilla').style.top = '0';
    document.querySelector('.vanilla').style.left = '0';

    var chocolate = document.querySelector('.chocolate');
    var cake = document.querySelector('.cake');
    var topCurrentPosition = parseFloat(getComputedStyle(chocolate).top);
    var leftCurrentPosition = parseFloat(getComputedStyle(chocolate).left);

    if (topCurrentPosition >= moveAmount) {
        chocolate.style.top = '0';
        chocolate.style.left = '0';
        cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(250, 206, 86)";
    } else {
        chocolate.style.top = topCurrentPosition + moveAmount + 'px';
        chocolate.style.left = leftCurrentPosition + 5 + '%';

        chocolate.addEventListener('transitionend', function() {
            topCurrentPosition = parseFloat(getComputedStyle(chocolate).top);
            
            if (topCurrentPosition >= moveAmount) {
                cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(105, 47, 13)";
            }
        });
    }
}

function moveDownCarrot() {
    document.querySelector('.strawberry').style.top = '0';
    document.querySelector('.strawberry').style.left = '0';
    document.querySelector('.chocolate').style.top = '0';
    document.querySelector('.chocolate').style.left = '0';
    document.querySelector('.vanilla').style.top = '0';
    document.querySelector('.vanilla').style.left = '0';

    var carrot = document.querySelector('.carrot');
    var cake = document.querySelector('.cake');
    var topCurrentPosition = parseFloat(getComputedStyle(carrot).top);
    var leftCurrentPosition = parseFloat(getComputedStyle(carrot).left);

    if (topCurrentPosition >= moveAmount) {
        carrot.style.top = '0';
        carrot.style.left = '0';
        cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(250, 206, 86)";
    } else {
        carrot.style.top = topCurrentPosition + moveAmount + 'px';
        carrot.style.left = leftCurrentPosition + -18 + '%';

        carrot.addEventListener('transitionend', function() {
            topCurrentPosition = parseFloat(getComputedStyle(carrot).top);
            
            if (topCurrentPosition >= moveAmount) {
                cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(250, 148, 53)";
            }
        });
    }
}

function moveDownVanilla() {
    document.querySelector('.strawberry').style.top = '0';
    document.querySelector('.strawberry').style.left = '0';
    document.querySelector('.chocolate').style.top = '0';
    document.querySelector('.chocolate').style.left = '0';
    document.querySelector('.carrot').style.top = '0';
    document.querySelector('.carrot').style.left = '0';
    moveAmount += 20;
    
    var vanilla = document.querySelector('.vanilla');
    var cake = document.querySelector('.cake');
    var topCurrentPosition = parseFloat(getComputedStyle(vanilla).top);
    var leftCurrentPosition = parseFloat(getComputedStyle(vanilla).left);

    if (topCurrentPosition >= moveAmount) {
        vanilla.style.top = '0';
        vanilla.style.left = '0';
        cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(250, 206, 86)";
    } else {
        vanilla.style.top = topCurrentPosition + moveAmount + 'px';
        vanilla.style.left = leftCurrentPosition + -39 + '%';

        vanilla.addEventListener('transitionend', function() {
            topCurrentPosition = parseFloat(getComputedStyle(vanilla).top);
            
            if (topCurrentPosition >= moveAmount) {
                cake.style.background = "radial-gradient(50% 60px at 50% 50px, #fff5 100%, #0000 0), rgb(255, 226, 151)";
                cake.style.backgroundImage = "radial-gradient(#743f04 1px, transparent 0)";
                cake.style.backgroundSize = "40px 40px";
                
            }
        });
    }
}

