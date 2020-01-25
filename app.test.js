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
      .post('/users')
      .send({
        firstName: "John",
        lastName: "Smitt",
        email: "test@test.com"
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('_id')
    done()
  })

  it('should return that user already exist', async (done) => {
    const res = await request(app)
      .post('/users')
      .send({
        firstName: "New",
        lastName: "Test",
        email: "test@test.com"
      })
    expect(res.statusCode).toEqual(409)
    done()
  })

  it('should remove the user', async (done) => {
    const res = await request(app)
      .delete('/users')
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
