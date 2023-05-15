const chai = require('chai');
const http = require('chai-http');
chai.use(http);
const app = require('../index');
const expect = chai.expect;

describe('Testing the review routes', function() {

    let result;

    it('Should complete post request with status 201', function(done) {
        chai.request(app)
            .post('/review/create')
            .send({
                "book_title": "MochaChaiTest", 
                "body": "MochaChaiTest",
                "author": "MochaChaiTest",
                "user": "MochaChaiTest",
                "date": new Date()
            })
            .end(function(err, response) {
                expect(err).to.be.null;
                expect(response).to.have.status(201);
                result = response.body;
                done();
            });
    });

    it('Should complete put request with status 200', function(done) {
        chai.request(app)
            .put(`/review/update/${result._id}`)
            .send({
                "book_title": "MochaChaiTestUpdate", 
                "body": "MochaChaiTestUpdate",
                "author": "MochaChaiTestUpdate",
                "user": "MochaChaiTestUpdate",
                "date": new Date()
            })
            .end(function(err, response) {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                done();
            });
    });

    it('Should complete getAll request with status 200', function(done) {
        chai.request(app)
            .get('/review/getAll')
            .end(function(err, response) {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body).to.have.lengthOf.above(1);
                done();
            });
    });

    it('Should complete get request with status 200', function(done) {
        chai.request(app)
            .get(`/review/get/${result._id}`)
            .end(function(err, response) {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body._id).to.equal(result._id, "expected id to match")
                done();
            });
    });
    
    it('Should complete delete request with status 200', function(done) {
        chai.request(app)
            .delete(`/review/delete/${result._id}`)
            .end(function(err, response) {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                done();
            });
    });

});