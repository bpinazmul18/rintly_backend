const lib = require('../lib')

describe('Absolute', () => {

    it('Should return a positive number if input is positive.', () => {
        const result = lib(1)
        expect(result).toBe(1)
    })
    
    it('Should return a positive number if input is Negative.', () => {
        const result = lib(-1)
        expect(result).toBe(1)
    })
    
    it('Should return a positive number if input is 0.', () => {
        const result = lib(0)
        expect(result).toBe(0)
    })

})