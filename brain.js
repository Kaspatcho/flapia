class Brain {
    constructor(inputs, outputs) {
        this.weights = []
        this.outputs = outputs

        for (let i = 0; i < outputs; i++) {
            this.weights.push([...new Array(inputs)].map(() => random(-1, 1)))
        }
    }

    guess(inputs) {
        if(inputs.length !== this.weights[0].length) throw new Error('numero errado de inputs na funcao guess')
        inputs = inputs.map(x => sigmoid(x))

        let outputs = []
        for (const weight of this.weights) {
            const result = weight.map((v, i) => v * inputs[i]).reduce((acc, value) => acc + value, 0)
            outputs.push(Math.tanh(result)) // range -1 a 1
        }

        return this.activate(outputs)
    }

    activate(outputs) {
        return outputs.map(v => v > 0.7)
    }
}

// o range de sigmoid e ate 10 entao ele precisa de uma constante
// para diminuir o valor de x
const k = 300
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x / k))
}

function sum(array) {
    return array.reduce((acc, v) => acc + v, 0)
}
