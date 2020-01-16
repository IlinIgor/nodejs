const request = require('supertest')
const app = require('./app.js')

describe('App', () => {
  it('should return all users', async (done) => {
    const res = await request(app)
      .get('/users')
    expect(res.statusCode).toEqual(200)
    expect(res.body instanceof Array).toBe(true)
    done()
  })

  it('should create a new user', async (done) => {
    const res = await request(app)
      .post('/user/create')
      .send({
        firstName: "John",
        lastName: "Smitt",
        email: "test@test.com"
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('firstName', 'John')
    expect(res.body).toHaveProperty('lastName', 'Smitt')
    expect(res.body).toHaveProperty('email', 'test@test.com')
    done()
  })

  it('should return that user already exist', async (done) => {
    const res = await request(app)
      .post('/user/create')
      .send({
        firstName: "New",
        lastName: "Test",
        email: "test@test.com"
      })
    expect(res.statusCode).toEqual(500)
    done()
  })

  it('should remove the user', async (done) => {
    const res = await request(app)
      .post('/user/remove')
      .send({
        email: "test@test.com"
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('firstName', 'John')
    expect(res.body).toHaveProperty('lastName', 'Smitt')
    expect(res.body).toHaveProperty('email', 'test@test.com')
    done()
  })
})
