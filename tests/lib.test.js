const lib = require('../lib')

test('Absolute- should return a positive number if input is positive.', () => {
    const result = lib(1)
    expect(result).toBe(1)
})

test('Absolute- should return a positive number if input is Negative.', () => {
    const result = lib(-1)
    expect(result).toBe(1)
})

test('Absolute- should return a positive number if input is 0.', () => {
    const result = lib(0)
    expect(result).toBe(1)
})