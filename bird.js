const JUMP_HEIGHT = -10

class Bird {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.gravity = createVector(0, 0.85)
        this.score = 0

        this.brain = new Brain(4, 1)

        this.r = 16
        this.color = '#ffff008f'
    }

    think(top, bottom) {
        let topd = dist(this.pos.x, this.pos.y, top.pos.x, top.pos.y + top.h)
        let inputs = [this.pos.x, this.pos.y, topd, bottom.pos.y]

        const outputs = this.brain.guess(inputs)
        this.actions(outputs)
    }

    actions(outputs) {
        if(outputs.length !== 1) throw Error('nem todas as acoes foram pensadas')

        if(outputs[0]) this.jump()
    }

    draw() {
        push()
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.r)
        pop()
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)

        this.vel.limit(15)
        this.acc.mult(0)
        this.fall()
    }

    fall() {
        if(this.pos.y + this.r < height) this.applyForce(this.gravity)
        else {
            this.acc.mult(0)
            this.vel.mult(0)
        }
    }

    jump() {
        this.vel.mult(0)
        this.vel.add(0, JUMP_HEIGHT)
    }

    applyForce(force) {
        this.acc.add(force)
    }

    collidePipe(pipe) {
        return this.pos.y < 0 && this.pos.x > pipe.pos.x || collideRectCircle(
            pipe.pos.x, pipe.pos.y, pipe.w, pipe.h,
            this.pos.x, this.pos.y, this.r
        )
    }
}

function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
    let testX = cx
    let testY = cy

    if (cx < rx) testX = rx              // left edge

    else if (cx > rx+rw) testX = rx+rw   // right edge

    if (cy < ry) testY = ry              // top edge
    else if (cy > ry+rh)testY = ry+rh    // bottom edge

    let distance = this.dist(cx,cy,testX,testY)

    return distance <= diameter/2
}
