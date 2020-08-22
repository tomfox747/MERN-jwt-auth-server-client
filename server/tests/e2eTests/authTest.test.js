const request = require('supertest')
const app = require('../../app')

const testUserName = "micheal Trull"
const testEmail = "testUser@gmail.com"
const testPassword = "testpassword"

let testAccessToken = ""
let testRefreshToken = ""

describe('Run full auth cycle', () =>{
    it('Create account', async (done) =>{
        let res = await request(app)
            .post('/create_account/create')
            .send(
                {
                    email:testEmail,
                    name:testUserName,
                    password:testPassword
                }
            )
        expect(res.text).toBe("account created")
        done()
    })
/*
    it('Login', async (done) =>{
        let res = await request(app)
            .post('/authenticate/login')
            .send(
                {
                    email:testEmail,
                    password:testPassword
                }
            )
        expect(200)
        testAccessToken = res.body.access_token
        testRefreshToken = res.body.refresh_token
        done()
    })*/
    /*
    it('Get a new access token', async (done) =>{
        console.log(testAccessToken)
        let res = await request(app)
            .post('/authenticate/refresh_token')
            .send(
                {
                    refresh_token:testRefreshToken
                }
            )
        expect(200)
        testAccessToken = res.body.access_token
        done()
    })

    it('delete account', async (done) =>{
        console.log(testAccessToken)
        let res = await request(app)
            .post('/create_account/delete_account')
            .auth(testAccessToken, {type: 'bearer'})
        expect(200)
        done()
    })*/
})