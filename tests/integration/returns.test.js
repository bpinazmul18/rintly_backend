const request = require('supertest')
const { mongoose } = require('mongoose')
const { Rental } = require('../../models/rental')

describe('/api/returns', () => {
    let server
    let customerId
    let movieId
    let rental

    beforeEach( async () => { 
        server = require('../../index')

        customerId = mongoose.Types.ObjectId()
        movieId = mongoose.Types.ObjectId()

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 5
            }
        })

        await rental.save()
    })

    afterEach( async () => {
        await server.close()
        await Rental.deleteMany({})
    })

    it('should return 401 if client is not logged in!', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId})

        expect(res.status).toBe(401)
    })
})