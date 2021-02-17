const request = require('supertest');
const app = require('../app');

describe("test", function() {

    before(() => console.log("before"));
    beforeEach(() => console.log("beforeEach"));

    it("hello:", function(done) {

        done();
    });

    it("bye:", function(done) {
        done();
    })

    it("GET /tests/1 테스트", (done) => {
        request(app).get('/tests/1').expect(200).end((err, res) => {
            if (err) {
                throw err;
            } else {
                console.log(res.body);
            }
            done();
        });

    });
});