const vatCalculator = require('../src/utils/vatCalculator')

describe("VAT calculator" , ()=>{
    test("Should return the correct VAT excluded amount for 20% " , ()){
    const result = vatCalculator.calculateVAT(16.67)
    except(result).toBe(3.33)
    })

    test("Should return correct gross ammount of 20% VAT ", ()=>{
        
    })
})
