const rp = require('request-promise');

export class TestServer {
  constructor(url) {
    this.url = url || 'http://127.0.0.1:4000';
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
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
        `,
      },
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
        `,
      },
    });
  }

  async forgotPassword(email) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            forgotPassword(email: "${email}")
          }
        `,
      },
    });
  }

  async changePassword(newPassword, key) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            changePassword(newPassword: "${newPassword}", key: "${key}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async createBoard(name) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createBoard(name: "${name}") {
              errors {
                path
                message
              }
              result {
                name
              }
            }
          }
        `,
      },
    });
  }

  async editBoard(id, name) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            editBoard(id: "${id}", name: "${name}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async deleteBoard(id) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            deleteBoard(id: "${id}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async createList(name, boardId) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createList(name: "${name}", boardId: "${boardId}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async editList(id, name) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            editList(id: "${id}", name: "${name}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async deleteList(id) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            deleteList(id: "${id}") {
              errors {
                path
                message
              }
              result
            }
          }
        `,
      },
    });
  }

  async getUsersBoards() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
           {
            getUsersBoards {
              name
              owner {
                email
              }
            }
          }
        `,
      },
    });
  }

  async getBoard(boardId) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
           {
            getBoard(boardId: "${boardId}") {
              result {
                name
                lists {
                  name
                }
              }
              errors {
                path
                message
              }
            }
          }
        `,
      },
    });
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
           {
            me {
              errors {
                path
                message
              }
              result {
                email
              }
            }
          }
        `,
      },
    });
  }
}
