const request = require('supertest')
const { Genre } = require('../../models/genre')
let server;


describe('/api/genres', () => {
    beforeEach(() => {
        server = require('../../index')
    })

    afterEach( async () => {
        server.close()
        await Genre.deleteMany({})
    })

    describe('GET /', () => {
        it('should return all genres.', async () => {
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ])

            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy()
            expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed.', async () => {
            const genre = await new Genre({ name: 'genre1'})
            await genre.save()

            const res = await request(server).get(`/api/genres/${genre._id}`)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', genre.name)
        })

        it('should return 404 if invalid id is passed.', async () => {
            const res = await request(server).get(`/api/genres/628f23b25a6e03c6a795e8f2`)
            expect(res.status).toBe(404)
        })
    })
})