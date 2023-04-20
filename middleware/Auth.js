class AUTH {
  authLogin = () => {
    return (req, res, next) => {
      if (!req.session.Email) {
        res.status(401);
        return res.json({ authorized: false });
      }

      next();
    };
  };

  authRole = (type) => {
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
