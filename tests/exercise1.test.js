const lib = require('../exercise1')

describe('Fizbuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => {lib.fizzBuzz('123')}).toThrow()
        expect(() => {lib.fizzBuzz(null)}).toThrow()
        expect(() => {lib.fizzBuzz(undefined)}).toThrow()
        expect(() => {lib.fizzBuzz({})}).toThrow()
    })

    it('should return fizzBuzz if input is divisable by 3 and 5', () => {
        const result = lib.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })

    it('should return Fizz if input is only divisable by 3', () => {
        const result = lib.fizzBuzz(9)
        expect(result).toBe('Fizz')
    })

    it('should return Bizz if input is only divisable by 5', () => {
        const result = lib.fizzBuzz(5)
        expect(result).toBe('Bizz')
    })

    it('should return number if input is not divisable', () => {
        const result = lib.fizzBuzz(1)
        expect(result).toBe(1)
    })
})