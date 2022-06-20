const request = require('supertest')
const { User } = require('../../models/user')
const { Genre } = require('../../models/genre')


describe('auth middleware.', () => {
    let server
    let token
    let name

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name })
    }

    beforeEach(() => { 
        server = require('../../index')
        token = new User().generateAuthToken()
    })

    afterEach( async () => { 
        await Genre.deleteMany({})
        await server.close() 
    })

    it ('should return 401 if no token is provided.', async () => {
        token = ''
        const res = await exec()
        expect(res.status).toBe(401)
    })

    it ('should return 400 if token is invalid.', async () => {
        token = 'a'
        const res = await exec()
        expect(res.status).toBe(400)
    })

    it ('should return 200 if token is valid.', async () => {
        name = 'genre1'
        const res = await exec()
        expect(res.status).toBe(200)
    })
})