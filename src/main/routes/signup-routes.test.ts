import request from 'supertest';
import app from '../config/app';

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Vinicius',
        email: 'vinicius.beloti@gmail.com',
        password: '123',
        passworedConfirmation: '123'
      })
      .expect(200);
  });
});
