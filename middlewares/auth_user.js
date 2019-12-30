module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect("/users/login");
  } else {
    if (req.user.id != req.params.id) {
      // console.log('userId'+req.user.Id+'Id'+req.params.id);
      res.redirect("/users/login");
    } else next();
  }
};
