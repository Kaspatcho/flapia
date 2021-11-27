var birds = []
var deadBirds = []

const population = 100
const mutationRate = 0.05
let generation = 1
var sel

var pipes = []
const pipeSpace = 150
const pipeMinHeight = 50
const totalPipes = 10
const pipeSpread = 200

function setup() {
    createCanvas(600, 600)

    for(let i=0; i < population; i++) {
        birds.push(new Bird(width / 4, height * 0.2))
    }

    for(let i=0; i < totalPipes; i++) {
        createPipe(i * pipeSpread)
    }

    sel = new Selection(population, mutationRate)
}

function draw() {
    background('#70c5ce')

    for (let b in birds) {
        const bird = birds[b]
        bird.draw()
        bird.update()
        bird.think(pipes[0], pipes[1])

        for(let i=0; i < 2; i++) {
            const pipe = pipes[i]
            if(pipe.pos.x < 0 || bird.pos.x > pipe.pos.x + pipe.w * 0.7) {
                pipes.splice(i, 1)
                bird.score++
                continue
            }
    
            if(bird.collidePipe(pipe)) {
                endGame(bird, b)
            }
        }
    }


    for (const pipe of pipes) {
        pipe.draw()
        pipe.update()
    }


    if(pipes.length / 2 < totalPipes) {
        for(let i=0; i < totalPipes - pipes.length / 2; i++) {
            createPipe((pipes.length - 1) / 2 * pipeSpread - pipeSpread)
        }
    }

    if(!birds.length) resetGame()
}

function endGame(bird, index) {
    deadBirds.push(bird)
    birds.splice(index, 1)
}

function resetGame() {
    birds = sel.breedBest(deadBirds, pipes[0])
    pipes = []
    
    for(let i=0; i < totalPipes; i++) {
        createPipe(i * pipeSpread)
    }
    console.log(`GERACAO: ${++generation}`)
}

function createPipe(start) {
    let x = width + start
    let h = random(pipeMinHeight + pipeSpace, height - pipeMinHeight - pipeSpace)
    pipes.push(new Pipe(x, 0, height - h - pipeSpace))
    pipes.push(new Pipe(x, height - h, h))
}
