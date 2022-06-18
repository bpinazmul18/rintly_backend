const { default: mongoose } = require("mongoose")
const auth = require("../../../middleware/auth")
const { User } = require("../../../models/user")

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid token.', () => {
        const user = {_id: mongoose.Types.ObjectId(), isAdmin: true}
        const token = User(user).generateAuthToken()

        const req = {
            header: jest.fn().mockReturnValue(token)
        }

        const res = {}
        const next = jest.fn()

        auth(req, res, next)

        expect(req.user).toMatchObject(user)

    })
})