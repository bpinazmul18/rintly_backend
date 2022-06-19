const mongoose = require('mongoose');
const request = require('supertest')
const { Genre } = require('../../models/genre')
const { User } = require('../../models/user')
let server;


describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index') })

    afterEach( async () => {
        await server.close()
        await Genre.deleteMany({})
    })

    describe('GET /', () => {
        it('should return all genres.', async () => {
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ])

            const res = await request(server)
                .get('/api/genres')

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

        it('should return 404 if no genre with the given id exists.', async () => {
            const id = mongoose.Types.ObjectId()
            const res = await request(server).get(`/api/genres/${id}`)
            expect(res.status).toBe(404)
        })
    })

    describe('POST /', () => {
        // Define the happy path, and then in each test, we change 
        // one parameter that clearly aligns with the name of the 
        // test. 
        let token
        let name

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name })
        }

        beforeEach(() => {
            token = new User().generateAuthToken()
            name = 'genre1'
        })

        it ('should return 401 if user in not logged in.', async () => {
            token = ''
            const res = await exec()
            expect(res.status).toBe(401)
        })

        it ('should return 400 if genre is less than 5 character.', async () => {
            name = '123'
            const res = await exec()
            expect(res.status).toBe(400)
        })

        it ('should return 400 if genre is more than 50 character.', async () => {
            name = new Array(52).join('a')
            const res = await exec()
            expect(res.status).toBe(400)
        })

        it ('should save the genre if it is valid.', async () => {
            await exec()
            const genre = await Genre.find({name: 'genre1'})
            expect(genre).not.toBeNull()

        })

        it ('should return the genre if it is valid.', async () => {
            const res = await exec()
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')

        })
    })

    describe('PUT /:id', () => {
        let id
        let token
        let newName
        let genre

        const exec = async () => {
            return await request(server)
                .put(`/api/genres/${id}`)
                .set('x-auth-token', token)
                .send({ name: newName })
        }

        beforeEach(async () => {
            genre = new Genre({ name: 'genre1'})
            await genre.save()

            token = new User().generateAuthToken()
            id =genre._id

            newName = 'genre1'
        })

        it ('should return 401 if user in not logged in.', async () => {
            token = ''
            const res = await exec()
            expect(res.status).toBe(401)
        })

        it ('should return 400 if genre is less than 5 character.', async () => {
            newName = '1234'
            const res = await exec()
            expect(res.status).toBe(400)
        })

        it ('should return 400 if genre is less than 50 character.', async () => {
            newName = new Array(55).join('a')
            const res = await exec()
            expect(res.status).toBe(400)
        })

        it ('should return 404 if genre id is invalid.', async () => {
            id = 1
            const res = await exec()
            expect(res.status).toBe(404)
        })

        it ('should return 404 if genre was not found by given ID!.', async () => {
            id = mongoose.Types.ObjectId()
            const res = await exec()
            expect(res.status).toBe(404)
        })

        it ('should update the genre if input is valid.', async () => {
            await exec()

            const updateGenre = await Genre.findById(genre._id)
            expect(updateGenre.name).toBe(newName)
        })

        it ('should return the updated genre if it is valid.', async () => {
            const res = await exec()

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name')
        })
    })

    describe('DEL /:id', () => {
        let id
        let token
        let genre

        const exec = async () => {
            return await request(server)
                .delete(`/api/genres/${id}`)
                .set('x-auth-token', token)
                // .send()
        }

        beforeEach(async () => {
            genre = new Genre({ name: 'new genre'})
            await genre.save()

            token = new User({ isAdmin: true }).generateAuthToken()
            id = genre._id
        })

        it ('should return 401 if client is not logged in.', async () => {
            token = ''
            const res = await exec()
            expect(res.status).toBe(401)
        })

        it ('should return 403 if the user is not an admin.', async () => {
            token = new User({ isAdmin: false}).generateAuthToken()
            const res = await exec()
            expect(res.status).toBe(403)
        })

        it ('should return 404 if id is invalid.', async () => {
            id = 1
            const res = await exec()
            expect(res.status).toBe(404)
        })

        it ('should return 404 if was not found by given ID!.', async () => {
            id = mongoose.Types.ObjectId()
            const res = await exec()
            expect(res.status).toBe(404)
        })

        it ('should delete the genre if input is valid.', async () => {
            await exec()
            const genreInDb = await Genre.findById(id)
            expect(genreInDb).toBeNull()
        })

        it ('should return the removed genre.', async () => {
            const res = await exec()
            expect(res.body).toHaveProperty('_id', genre._id.toHexString())
            expect(res.body).toHaveProperty('name', genre.name)
        })

    })
})