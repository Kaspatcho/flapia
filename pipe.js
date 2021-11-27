class Pipe {
    constructor(x, y, h) {
        this.pos = createVector(x, y)
        this.vel = createVector(-2, 0)
        this.acc = createVector(0, 0)

        this.w = 40
        this.h = h
        this.color = '#0f0'
    }

    draw() {
        push()
        fill(this.color)
        rect(this.pos.x, this.pos.y, this.w, this.h)
        pop()
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.acc.mult(0)
    }
}
