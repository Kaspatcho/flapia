class Selection {
    constructor(population, mutation) {
        this.population = population
        this.mutation = mutation
    }

    score(bird, topPipe) {
        // penaliza quem esta longe do cano e nao tem score nenhum
        if(bird.score === 0) {
            let d = dist(bird.pos.x, bird.pos.y, topPipe.pos.x, topPipe.pos.y + topPipe.h + 10)
            bird.score -= map(d, 0, width, 0, 100)
        }
        return bird.score
    }

    breedBest(birds, topPipe) {
        const bests = birds.sort((a, b) => this.score(b, topPipe) - this.score(a, topPipe))
        const best = bests[0]
        const secondBest = bests[1]

        let children = [... new Array(this.population)].map(() => new Bird(width / 4, height * 0.2))

        for (let i in children) {
            children[i].score = 0
            children[i].brain = new Brain(birds[0].brain.weights[0].length, birds[0].brain.outputs)
            if(random(1) < this.mutation) {
                children[i] = new Bird(width / 4, height * 0.2)
            }
            else if(random(1) < 0.5) {
                children[i].brain.weights = best.brain.weights
            }
            else {
                children[i].brain.weights = secondBest.brain.weights
            }
        }

        console.log(`best score: ${this.score(best, topPipe)}`)

        return children
    }
}
