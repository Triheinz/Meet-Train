module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  isLoggedOut: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/private/profile');
    } else {
      next();
    }
  },
  checkRole: (role) => (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      next();
    } else {
      res.redirect('/login');
    }
  },
};
