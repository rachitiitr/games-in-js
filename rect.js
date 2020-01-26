BLOB_CIRCLE = 'CIRCLE';
BLOB_RECT = 'RECT';

function drawRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);

    ctx.closePath();
}

class Blob {
    constructor(type, x=W/2, y=H/2, w=20, h=20, color='black') {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = color;
        this.dx = 2; 
        this.dy = 2;
        this.type = type;
        if (this.type == BLOB_CIRCLE)
            this.rad = this.w
    }

    modulo() {
        this.x = Math.min(this.x, W-this.w);
        this.y = Math.min(this.y, H-this.h);
        this.x = Math.max(0, this.x);
        this.y = Math.max(0, this.y);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.modulo();
        this.draw();
    }

    draw() {
        if (this.type == BLOB_CIRCLE)
            drawCircle(this.x, this.y, this.rad, this.col);
        else
            drawRect(this.x, this.y, this.w, this.h, this.col);
    }

    keyDownHandler(e) {
        let code = e.keyCode;
        switch (code) {
            case 37: this.dx = -2; break; //Left key
            case 38: this.dy = -2; break; //Up key
            case 39: this.dx = 2; break; //Right key
            case 40: this.dy = 2; break; //Down key
            case 32: this.dy = -20; break; //Space key
            default: console.log(code); //Everything else
        }
    }
    keyUpHandler(e) {
        let code = e.keyCode;
        switch (code) {
            case 37: this.dx = 0; break; //Left key
            case 38: this.dy = 0; break; //Up key
            case 39: this.dx = 0; break; //Right key
            case 40: this.dy = 0; break; //Down key
            case 32: this.dy = 0; break; //Space key
            default: console.log(code); //Everything else
        }
    }
}
