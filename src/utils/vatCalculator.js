const vatCalculator = {
    calculateVAT : (netAmmount) => {
        return Math.round((netAmmount * 0.20) * 1e2 ) / 1e2
    },
    calculateGroosAmmount : (netAmmount) => {
        return Math.round((netAmmount * 1.20) * 1e2 ) / 1e2
    }
}

module.exports = vatCalculator
