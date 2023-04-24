//Dependency Inversion

class AUTH {

  constructor(user) {
    this.auth = new Auth(user)
  }

  Auth_Login() {
    this.auth.authLogin()
  }

  Auth_Role(type) {
    this.auth.authRole(type)
  }

}

class Auth {
  constructor(user) {
    this.user = user
  }

  authLogin() {
    return (req, res, next) => {
      if (!req.session.Email) {
        res.status(401);
        return res.json({ authorized: false });
      }

      next();
    };
  };

  authRole(type) {
    return (req, res, next) => {
      if (req.session.type !== type) {
        res.status(401);
        return res.json({ authorized: false });
      }

      next();
    };
  };
}

module.exports = AUTH;
