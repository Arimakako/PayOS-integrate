var userService = require('./userService');

module.exports.createUserControllerFn = async (req, res) => {
    try {
        var result = await userService.createUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.message });
        } else {
            res.status(400).send({ "status": false, "message": result.message });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ "status": false, "message": "Server error" });
    }
};
module.exports.loginUserControllerFn = async (req, res) => {
    try {
        var result = await userService.loginUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "token": result.token });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "status": false, "message": "Server error" });
    }
};