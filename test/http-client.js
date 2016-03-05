import chai from "chai";
import HttpClient from "../src/http-client";

const should = chai.should();

describe("http client", () => {
  let http, XHR;

  beforeEach(() => {
    global.window = {};

    XHR = class {
      open() {}
      setRequestHeader() {}
      send() {
        setTimeout(() => {
          this.status = 200;
          this.onload(this);
        }, 0);
      }
    };

    window.XMLHttpRequest = XHR;

    http = new HttpClient();
  });

  describe("on error", () => {
    beforeEach(() => {
      XHR.prototype.send = function() {
        setTimeout(() => {
          this.onerror(this);
        }, 0);
      };
    });

    it("should reject promise", (done) => {
      http.post("/hello").catch(() => {
        done();
      });
    });
  });

  describe("on time out", () => {
    beforeEach(() => {
      XHR.prototype.send = function() {
        setTimeout(() => {
          this.ontimeout(this);
        }, 0);
      };
    });

    it("should reject promise", (done) => {
      http.post("/hello").catch(() => {
        done();
      });
    });
  });


  it("should set headers", (done) => {
    const headers = {};

    http.headers = {
      "a": "b",
      "c": "d"
    };

    XHR.prototype.setRequestHeader = function(key, value) {
      headers[key] = value;
    };

    http.post("/hello").then(() => {
      headers.should.deep.equal(http.headers);
    }).then(done).catch(done);
  });

  it("should set base url", (done) => {
    http.baseUrl = "localhost";

    XHR.prototype.open = function(method, url) {
      url.should.equal("localhost/hello");
    };

    http.post("/hello").then(() => {
      done();
    });
  });

  describe("interceptors", () => {
    describe("on success", () => {
      it("it should call all response interceptors", (done) => {
        http.interceptors.push({
          response: (res) => {
            res.response = 0;
            return res;
          },
          responseError: (res) => {
            res.responseError = 0;
            return res;
          }
        });

        http.interceptors.push({
          response: (res) => {
            res.response++;
            return res;
          },
          responseError: (res) => {
            res.responseError++;
            return res;
          }
        });

        http.post("/hello").then((res) => {
          res.response.should.equal(1);
          should.not.exist(res.responseError);
        }).then(done).catch(done);
      });
    });

    describe("on error", () => {
      beforeEach(() => {
        XHR.prototype.send = function() {
          setTimeout(() => {
            this.status = 400;
            this.onload(this);
          }, 0);
        };
      });

      it("should call all response error interceptors", (done) => {
        http.interceptors.push({
          response: (res) => {
            res.response = 0;
            return res;
          },
          responseError: (res) => {
            res.responseError = 0;
            return res;
          }
        });

        http.interceptors.push({
          response: (res) => {
            res.response++;
            return res;
          },
          responseError: (res) => {
            res.responseError++;
            return res;
          }
        });

        http.post("/hello").catch((res) => {
          should.not.exist(res.response);
          res.responseError.should.equal(1);
        }).then(done).catch(done);
      });
    });
  });
});
