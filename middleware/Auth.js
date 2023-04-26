//Dependency Inversion

class USERAUTH {
  constructor(auth) {
    this.auth = auth;
  }

  authLogin() {
    return this.auth.authLogin();
  }

  authRole(type) {
    return this.auth.authRole(type);
  }
}

class Auth {
  constructor() {}

  authLogin() {
    return (req, res, next) => {
      if (!req.session.Email) {
        res.status(401);
        return res.json({ authorized: false });
      }

      next();
    };
  }

  authRole(type) {
    return (req, res, next) => {
      if (req.session.type !== type) {
        res.status(401);
        return res.json({ authorized: false });
      }

      next();
    };
  }
}

module.exports = { USERAUTH, Auth };
