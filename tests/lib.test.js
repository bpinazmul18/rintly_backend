const lib = require('../lib')

describe('Absolute', () => {

    it('Should return a positive number if input is positive.', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    
    it('Should return a positive number if input is Negative.', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    
    it('Should return a positive number if input is 0.', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })

})

describe('Greet', () => {
    it('Should return a sentence if input is string.', () => {
        const result = lib.greet('Nazmul')
        expect(result).toMatch(/Nazmul/)
        expect(result).toContain('Nazmul')
    })
})