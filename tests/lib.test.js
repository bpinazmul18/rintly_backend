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

describe('getCurrencies', () => {
    it('should return a currencies array!', () => {
        const result = lib.getCurrencies()

        // Too general
        expect(result).toBeDefined()
        expect(result).not.toBeNull()

        // Too specific
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('Taka')
        expect(result[2]).toBe('Ruppee')
        expect(result.length).toBe(3)

        // Proper way
        expect(result).toContain('USD')
        expect(result).toContain('Taka')
        expect(result).toContain('Ruppee')

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['USD', 'Taka', 'Ruppee']))
    })
})

describe('getProduct', () => {
    it('Should return the product with the given id..', () => {
        const result = lib.getProduct(1)
        // expect(result).toBe({ id: 1, price: 30})
        // expect(result).toEqual({ id: 1, price: 30})
        // expect(result).toStrictEqual({ id: 1, price: 30})
        expect(result).toMatchObject({ id: 1, price: 30})
        // expect(result).toHaveProperty('id', '1')
    })
})

describe('registerUser', () => {
    it('Should return error if username is falsy.', () => {
        const args = [undefined, null, false, 0, "", NaN]
        args.forEach((a) => {
            expect(()=> {lib.registrationUser(a)}).toThrow()
        })
    })

    it('Should return a user object if valid usernaem is passed!', () => {
        const result = lib.registrationUser('Nazu')
        expect(result).toMatchObject({username: 'Nazu'})
        expect(result.id).toBeGreaterThan(0)
    })
})