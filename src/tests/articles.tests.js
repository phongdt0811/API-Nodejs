const { expect } = require('chai');
const supertest = require('supertest');
const urlDomain = 'http://localhost:3001';
const request = supertest(urlDomain);
const prefix = '/api/v1';
const _ = require('lodash');

var listArticles;

describe('Articles', () => {
    describe('/articles', () => {
        it('should create an article', (done) => {
            request.post(`${prefix}/articles`)
                .send({ 
                    title: 'Testing title',
                    nickname: 'Testing nickname',
                    content: 'Testing content'
                })
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.property('success', true);
                })
                .end(done);
        })
        it('should get list articles page 20', (done) => {
            request.get(`${prefix}/articles`)
                .query({page: 0, size: 20})
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.property('success', true);
                    expect(res.body.data.total <= 20).equal(true);
                    listArticles = _.get(res, 'body.data.result');
                })
                .end(done);
        })
        describe('/articles/:id', () => {
            var picked = { id : 1 };
            it('should get an article', (done) => {
                request.get(`${prefix}/articles/${_.get(picked, 'id')}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body).to.have.property('success', true);
                    })
                    .end(done);
            })
        })
    })
})