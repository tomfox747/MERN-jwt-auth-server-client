const request = require('supertest')
const app = require('../../app')

describe('HeathCheck test', () =>{
    it('check', async (done) =>{
        const res = await request(app)
            .get('/health_check/check')
        expect(res.text).toBe("success")
        done()
    })
})