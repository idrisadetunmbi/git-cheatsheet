import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';
import { Category, Cheat } from '../models/index';

chai.use(chaiHttp);

describe('Cheats endpoints', () => {
  describe('[POST] /', () => {
    it('fails with a 400 with an empty request body', (done) => {
      chai.request(server)
        .post('/api/cheats')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          done();
        });
    });

    it('fails with a 400 when category is not specified in request body', (done) => {
      chai.request(server)
        .post('/api/cheats')
        .send({
          command: 'git init',
          description: 'initializes git',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.include('category').to.include('required');
          done();
        });
    });

    it('fails with a 400 when description is not specified in request body', (done) => {
      chai.request(server)
        .post('/api/cheats')
        .send({
          command: 'git init',
          category: 'whatever',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.include('description').to.include('required');
          done();
        });
    });

    it('fails with a 400 when command is not specified in request body', (done) => {
      chai.request(server)
        .post('/api/cheats')
        .send({
          description: 'install git',
          category: 'whatever',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.include('command').to.include('required');
          done();
        });
    });

    it('fails with a 400 when specified category is invalid', (done) => {
      chai.request(server)
        .post('/api/cheats')
        .send({
          description: 'install git',
          category: 'invalid category',
          command: 'git init',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.include('category');
          done();
        });
    });

    it('returns a 201 when cheat is successfully created', async () => {
      const category = new Category({ title: 'Install Git' });
      await category.save();
      const res = await chai.request(server)
        .post('/api/cheats')
        .send({
          description: 'install git',
          category: category._id,
          command: 'git init',
        });
      expect(res.status).to.equal(201);
      expect(res.body.data).to.haveOwnProperty('_id');
      expect(res.body.data.description).to.equal('install git');
      expect(res.body.data.command).to.equal('git init');
    });
  });

  describe('[GET] /', async () => {
    it('responds with an empty array when no cheat has been added', async () => {
      const res = await chai.request(server).get('/api/cheats');
      expect(res.status).to.equal(200);
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.be.empty;
    });

    it('responds with the expected number of cheats', async () => {
      const category = new Category({ title: 'Install Git' });
      await category.save();
      const cheat = new Cheat({
        description: 'install git',
        category: category._id,
        command: 'git init',
      });
      await cheat.save();

      const res = await chai.request(server).get('/api/cheats');
      expect(res.status).to.equal(200);
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body.data).to.have.lengthOf(1);
    });
  });
});
