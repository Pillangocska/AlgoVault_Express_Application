const getAlgorithmMW = require('../../../../middleware/algorithm/getAlgorithmMW');

describe('getAlgorithmMW middleware', function () {
    let expect;

    before(async function() {
        const chai = await import('chai');
    expect = chai.expect;
    });

  it('should fetch and return an algorithm', function (done) {
    const req = {
      params: {
        id: 'fakeAlgorithmId'
      }
    };
    const res = {
      locals: {}
    };
    const fakeAlgoModel = {
      findById: function (id) {
        return {
          populate: function () {
            return Promise.resolve({
              id: 'fakeAlgorithmId',
              name: 'Test Algorithm',
              _author: {
                username: 'testUser'
              }
            });
          }
        };
      }
    };

    getAlgorithmMW({
      AlgoModel: fakeAlgoModel
    })(req, res, function (err) {
      expect(res.locals.algorithm).to.deep.equal({
        id: 'fakeAlgorithmId',
        name: 'Test Algorithm',
        _author: {
          username: 'testUser'
        }
      });
      expect(err).to.be.undefined;
      done();
    });
  });

  it('should return 404 when algorithm is not found', function (done) {
    const req = {
      params: {
        id: 'nonexistentId'
      }
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(404);
        return this;
      },
      send: function (message) {
        expect(message).to.equal('Algorithm not found');
        done();
      }
    };
    const fakeAlgoModel = {
      findById: function (id) {
        return {
          populate: function () {
            return Promise.resolve(null);
          }
        };
      }
    };

    getAlgorithmMW({
      AlgoModel: fakeAlgoModel
    })(req, res, function () {
      // This should not be called
      expect.fail('Next should not be called');
    });
  });

  it('should return 500 when database error occurs', function (done) {
    const req = {
      params: {
        id: 'fakeAlgorithmId'
      }
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      send: function (message) {
        expect(message).to.equal('An error occurred while fetching the algorithm');
        done();
      }
    };
    const fakeAlgoModel = {
      findById: function (id) {
        return {
          populate: function () {
            return Promise.reject(new Error('Database error'));
          }
        };
      }
    };

    getAlgorithmMW({
      AlgoModel: fakeAlgoModel
    })(req, res, function () {
      expect.fail('Next should not be called');
    });
  });
});
