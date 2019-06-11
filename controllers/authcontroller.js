var exports = module.exports = {};
 
exports.signup =  function signup(req, res) {
    res.render("signup");
}

exports.signin = function(req, res) {
    res.render("signin");
}