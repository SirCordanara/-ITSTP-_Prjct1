function requireAuth(req, res, next) {
  //ес сессии нить то отправляем на начальную
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  next();
}

module.exports = { requireAuth };
