const { expect } = require('chai');
const supertest = require('supertest');
const urlDomain = 'http://localhost:3001';
const request = supertest(urlDomain);
const prefix = '/api/v1';
const _ = require('lodash');

describe('Comments', () => {
    describe('/comments', () => {
        before(done => {
            done();
        })
        it('should create a comment', (done) => {
            request.post(`${prefix}/comments`)
                .send({ 
                    aId: 1,
                    nickname: 'Testing nickname',
                    content: 'Testing comments'
                })
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.property('success', true);
                })
                .end(done);
        })
        it('should create a comment on comment', (done) => {
            before(done => done());
            request.post(`${prefix}/comments`)
                .send({ 
                    aId: 1,
                    cId: 1,
                    nickname: 'Testing nickname',
                    content: 'Testing comments on a comments'
                })
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.property('success', true);
                })
                .end(done);
        })
        it('should get a comment on comment', (done) => {
            request.get(`${prefix}/comments`)
                .query({ aId: 2 })
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.property('success', true);
                })
                .end(done);
        })
    })
})