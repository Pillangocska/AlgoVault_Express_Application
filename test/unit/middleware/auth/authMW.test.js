const sinon = require('sinon');
const authMW = require('../../../../middleware/auth/authMW');

describe('Auth Middleware - authMW', function () {
  let expect;

  before(async function() {
    const chai = await import('chai');
    expect = chai.expect;
  });

  it('should call next() when user is authenticated', function (done) {
    const req = {
      session: {
        userId: 'someUserId'
      }
    };
    const res = {};
    const next = sinon.spy();

    authMW({})(req, res, next);

    expect(next.calledOnce).to.be.true;
    done();
  });

  it('should redirect to login page when user is not authenticated', function (done) {
    const req = {
      session: {}
    };
    const res = {
      redirect: sinon.spy()
    };
    const next = sinon.spy();

    authMW({})(req, res, next);

    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith('/login')).to.be.true;
    expect(next.called).to.be.false;
    done();
  });
});
