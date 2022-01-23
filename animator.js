class Animator {
    constructor(spriteSheet, xStart, yStart, width, height, 
        frameCount, frameDuration, framePadding, reverse, loop) {

        Object.assign(this, {spriteSheet, xStart, 
            yStart, width, height, frameCount, frameDuration, framePadding, 
            reverse, loop});

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    }

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDOne()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;


        ctx.drawImage(this.spriteSheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);

    };

    drawFrameY(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDOne()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;


        ctx.drawImage(this.spriteSheet,
            this.xStart, this.yStart + frame * (this.height + this.framePadding), //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);

    };



    currentFrame() {
        let currFrame = Math.floor(this.elapsedTime / this.frameDuration);
        return currFrame;
    };

    isDOne() {
        let isDone = (this.elapsedTime >= this.totalTime)
        return isDone;
    };

    drawFrameReverse(tick, ctx, x, y, scale) {
        if (this.isDOne()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        var offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.width;
        offscreenCanvas.hieght = this.hieght;
        var offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.save();
        offscreenCtx.scale(-1,1);
        this.elapsedTime += tick;
        offscreenCtx.drawImage(this.spriteSheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            -this.width-0, 0,
            this.width * scale,
            this.height * scale);
        offscreenCtx.restore();
        ctx.drawImage(offscreenCanvas,x,y);

    }

}