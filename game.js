console.log('ok!')
let canvas = document.querySelector('#cvGame')
let ctx = canvas.getContext('2d');
let W = canvas.getBoundingClientRect().width;
let H = canvas.getBoundingClientRect().height;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// player2 = new Blob(BLOB_RECT, 0, 0, 20, 20, 'cyan');
player2 = new Blob(BLOB_CIRCLE, 40, 40, 20, 20, 'brown');
ledges = [
            new Ledge(10, 200, 200),
            new Ledge(5, 600, 350),
            new Ledge(9, 360, 550),
            new Ledge(7, 40, 750),
        ]


function draw() {
    drawRect(0, 0, W, H, 'black');
    // player.update();
    player2.update();
    ledges.forEach(ledge => {
        ledge.update();
        ledge.collide(player2);
    });

    requestAnimationFrame(draw);
}

draw();

function drawCircle(centerX, centerY, radius, fillColor) {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.arc(centerX,centerY, radius, 0,Math.PI*2, true);
    ctx.fill();

    ctx.closePath();
}

function drawText(topLeftX, topLeftY, msg, fillColor='black', fontSize='3em') {
    ctx.font = `${fontSize} Arial`;
    ctx.fillStyle = fillColor
    ctx.fillText(msg, topLeftX, topLeftY)
}

function keyDownHandler(e) {
    // player.keyDownHandler(e);
    player2.keyDownHandler(e);
}

function keyUpHandler(e) {
    // player.keyUpHandler(e);
    player2.keyUpHandler(e);
}
