// Testing numbers

module.exports.absolute = function (number) {
    return (number >= 0) ? number : -number
}

// Testing string
module.exports.greet = function (string) {
    return `Good morning ${string}`
}

// Testing array
module.exports.getCurrencies = function () {
    return ['USD', 'Taka', 'Ruppee']
}

// Testing object
module.exports.getProduct = function (productId) {
    return {id: productId, price: 30, category: 'a'}
}

// Testing registration
module.exports.registrationUser = function (username) {
    if (!username) throw new Error('username is required!')

    return {id: new Date().getTime(), username: username}
}