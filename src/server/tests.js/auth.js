import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import server from '../index';
import { User } from '../models/index';

chai.use(chaiHttp);

beforeEach((done) => {
  mongoose.connection.dropDatabase()
    .then(() => {
      done();
    })
    .catch(done);
});

describe('Auth endpoints', () => {
  describe('Sign Up Endpoint', () => {
    it('fails with a 400 if request body is empty', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          done();
        });
    });

    it('fails with a 400 if request password is not included', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .send({
          username: 'johndoe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          expect(res.body.error).to.contain('password').to.contain('required');
          done();
        });
    });

    it('fails with a 400 if request username is not included', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .send({
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          expect(res.body.error).to.contain('username').to.contain('required');
          done();
        });
    });

    it('creates a new account succesfully', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .send({
          password: 'password',
          username: 'johndoe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).not.to.have.key('error');
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body.data.username).to.equal('johndoe');
          expect(res.body.data).to.haveOwnProperty('token');
          expect(res.body.data).to.not.haveOwnProperty('password');
          done();
        });
    });
  });

  describe('Sign In Endpoint', () => {
    beforeEach(async () => {
      const user = new User({ username: 'johndoe', password: 'password' });
      await user.save();
    });

    it('fails with a 400 if request body is empty', (done) => {
      chai.request(server)
        .post('/api/auth/signin')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          expect(res.body.error).to.equal('Invalid sign in credentials');
          done();
        });
    });

    it('fails with a 400 if password is not included', (done) => {
      chai.request(server)
        .post('/api/auth/signin')
        .send({
          username: 'johndoe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          done();
        });
    });

    it('fails with a 400 if username does not exist', (done) => {
      chai.request(server)
        .post('/api/auth/signin')
        .send({
          username: 'unavailable',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          expect(res.body.error).to.equal('Invalid sign in credentials');
          done();
        });
    });

    it('fails with a 400 if request password is incorrect', (done) => {
      chai.request(server)
        .post('/api/auth/signin')
        .send({
          username: 'johndoe',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.key('error');
          expect(res.body.error).to.equal('Invalid sign in credentials');
          done();
        });
    });

    it('signs user in successfully with correct details', (done) => {
      chai.request(server)
        .post('/api/auth/signin')
        .send({
          password: 'password',
          username: 'johndoe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).not.to.have.key('error');
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body.data.username).to.equal('johndoe');
          expect(res.body.data).to.haveOwnProperty('token');
          expect(res.body.data).to.not.haveOwnProperty('password');
          done();
        });
    });
  });
});
