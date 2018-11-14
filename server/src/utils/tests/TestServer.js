const rp = require("request-promise");

export class TestServer {
  constructor(url) {
    this.url = url || "http://127.0.0.1:4000";
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true
    };
  }

  async register(email, displayName, password, confirmPassword) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            register(email: "${email}", password: "${password}", displayName: "${displayName}", confirmPassword: "${confirmPassword}") {
              errors {
                path
                message
              }
              result
            }
          }
        `
      }
    });
  }

  async login(email, password) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            login(email: "${email}", password: "${password}") {
              errors {
                path
                message
              }
              session
            }
          }
        `
      }
    });
  }
}
