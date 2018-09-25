module.exports.login = (req,res) => {
    res.status(200).json({
        loginInfo: {
            login: req.body.login,
            password: req.body.password
        }
    });
};
module.exports.register = (req,res) => {
    res.status(200).json({
        message: 'register'
    });
};