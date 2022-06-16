const vatCalculator = {
    calculateVAT : (netAmmount) => {
        return Math.round((netAmmount * 0.20) * 1e2 ) / 1e2
    }
    calculateGroosAmmount : (grossAmmount) => {
        return Math.round((netAmmount * 1.20) * 1e2 ) / 1e2
    }
    calculateNetAmmount : (grossAmmount) => {
        return Math.round ((grossAmmount / 1.20) * 1e2) /1e2
    }
}

