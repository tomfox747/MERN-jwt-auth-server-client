const request = require('supertest')
const app = require('../../app')

const badUserName = "micheal trull ,./"
const badEmail = "test@)^}."
const badPassword = "password!"

const testUserName = "michealtrull"
const testEmail = "test@gmail.com"
const testPassword = "password"

let testAccessToken = ""
const refreshAccessToken = ""

describe('check the incorrect signup and signin values', () =>{
    
    it('create correct account for testing purposes', async (done) =>{
        let res = await request(app).post('/create_account/create')
            .send({
                name:testUserName,
                email:testEmail,
                password:testPassword
            })
        expect(res.text).toBe("account created")
        done()
    })
    
    it('try to create account with bad username inputs', async (done) =>{
        let res = await request(app).post('/create_account/create')
            .send(
                {
                    name:badUserName,
                    email:testEmail,
                    password:testPassword
                }
            )
        expect(res.text).toBe("invalid inputs")
        done()
    })

    it('try to create account with bad email input', async(done) =>{
        let res = await request(app).post('/create_account/create')
            .send(
                {
                    name:testUserName,
                    email:badEmail,
                    password:testPassword
                }
            )
        expect(res.text).toBe("invalid inputs")
        done()
    })
    it('try to create account with bad password input', async(done) =>{
        let res = await request(app).post('/create_account/create')
            .send(
                {
                    name:testUserName,
                    email:testEmail,
                    password:badPassword
                }
            )
        expect(res.text).toBe("invalid inputs")
        done()
    })

    it('try to sign in to account with incorrect email', async(done) =>{
        let res = await request(app).post('/authenticate/login')
            .send(
                {
                    email:"asdfghjkl",
                    password:testPassword
                }
            )
        expect(res.text).toBe("no user found")
        done()
    })

    it('try to sign in to account with incorrect password', async(done) =>{
        let res = await request(app).post('/authenticate/login')
            .send(
                {
                    email:testEmail,
                    password:"asdfhjkl"
                }
            )
        expect(res.text).toBe("incorrect password")
        done()
    })

    it('try to sign in with bad sign in inputs', async(done) =>{
        let res = await request(app).post('/authenticate/login')
            .send({
                email:"!$%^&<",
                password:"!$%^&<"
            })
        expect(res.text).toBe("invalid inputs")
        done()
    })
    
    
    it('Login', async (done) =>{
        let res = await request(app).post('/authenticate/login')
            .send(
                {
                    email:testEmail,
                    password:testPassword
                }
            )
        expect(res.body.info).toBe("success")
        testAccessToken = res.body.access_token
        done()
    })

    it('delete the test account', async(done) =>{
        let res = await request(app).post('/create_account/delete_account')
            .auth(testAccessToken, {type:'bearer'})
        expect(res.text).toBe("success")
        done()
    })
})