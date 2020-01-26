BLOB_CIRCLE = 'CIRCLE';
BLOB_RECT = 'RECT';

// Jumping event states
JUMPING_NOT = 'JUMPING_NOT'
JUMPING_ASCEND = 'JUMPING_ASCEND'
JUMPING_DESCEND = 'JUMPING_DESCEND'


function drawRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);

    ctx.closePath();
}


class Blob {
    constructor(type, x=W/2, y=H/2, w=20, h=20, color='black') {
        this.space = {
            x,
            y,
            w,
            h
        }

        this.col = color;
        
        this.speed = {
            dx: 0,
            dy: 10
        }
        
        this.type = type;
        if (this.type == BLOB_CIRCLE)
            this.space.rad = this.space.w

        this.events = {
            jumping: {
                status: JUMPING_NOT,
                threshold: 100,
                current: 0
            }
        }
    }

    modulo() {
        this.space.x = Math.min(this.space.x, W-this.space.w);
        this.space.y = Math.min(this.space.y, H-this.space.h);
        this.space.x = Math.max(0, this.space.x);
        this.space.y = Math.max(0, this.space.y);
    }

    update() {
        this.space.x += this.speed.dx;
        this.space.y += this.speed.dy;
        if (this.events.jumping.status == JUMPING_ASCEND) {
            if (this.speed.dy >= 0) {
                this.events.jumping.status = JUMPING_DESCEND;
                this.events.jumping.threshold = this.events.jumping.current;
                this.events.jumping.current = 0;
                this.speed.dy = 0;
            }
            else {
                this.events.jumping.current += Math.abs(this.speed.dy);
                this.speed.dy += 9.8*0.1
            }
        }
        else if (this.events.jumping.status == JUMPING_DESCEND) {
            if (this.events.jumping.current >= this.events.jumping.threshold) {
                this.events.jumping.status = JUMPING_NOT;
                this.events.jumping.current = 0;
                this.speed.dy = 0;
            }
            else {
                this.events.jumping.current += Math.abs(this.speed.dy);
                this.speed.dy += 9.8*0.1
            }
        }
        this.modulo();
        this.draw();
    }

    draw() {
        if (this.type == BLOB_CIRCLE)
            drawCircle(this.space.x, this.space.y, this.space.rad, this.col);
        else
            drawRect(this.space.x, this.space.y, this.space.w, this.space.h, this.col);
    }

    keyDownHandler(e) {
        let code = e.keyCode;
        switch (code) {
            case 37: this.speed.dx = -2; break; //Left key
            // case 38: this.speed.dy = -2; break; //Up key
            case 39: this.speed.dx = 2; break; //Right key
            // case 40: this.speed.dy = 2; break; //Down key
            case 32: { //Space key
                if (this.events.jumping.status != JUMPING_NOT)
                    break;
                this.events.jumping.status = JUMPING_ASCEND;
                this.events.jumping.current = 0;
                this.speed.dy = -20;
                break; 
            }
            default: console.log(code); //Everything else
        }
    }

    keyUpHandler(e) {
        let code = e.keyCode;
        switch (code) {
            case 37: this.speed.dx = 0; break; //Left key
            // case 38: this.speed.dy = 0; break; //Up key
            case 39: this.speed.dx = 0; break; //Right key
            // case 40: this.speed.dy = 0; break; //Down key
            case 32: break; //Space key
            default: console.log(code); //Everything else
        }
    }
}
