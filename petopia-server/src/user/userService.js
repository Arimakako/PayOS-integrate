var userModel = require('./userModel.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var key = '0946259131'; // Replace with a secure key

module.exports.createUserDBService = async (userDetails) => {
    try {
        var hashedPassword = bcrypt.hashSync(userDetails.password, 8);
        var userModelData = new userModel({
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            email: userDetails.email,
            password: hashedPassword,
            role: userDetails.role || 'client'
        });
        const existingUser = await userModel.findOne({ email: userDetails.email });
        if (existingUser) {
            // Nếu email đã tồn tại, trả về một thông báo lỗi
            return { status: false, message: "Email already exists" };
        }
        var savedUser = await userModelData.save();
        return { status: true, user: savedUser };
    } catch (error) {
        // handle error
        console.log(error);
        throw new Error('Error saving user');
    }
};

module.exports.loginUserDBService = async (userDetails) => {
    try {
        var user = await userModel.findOne({ email: userDetails.email });
        if (!user) {
            return { status: false, msg: "User not found" };
        }

        var passwordIsValid = bcrypt.compareSync(userDetails.password, user.password);
        if (!passwordIsValid) {
            return { status: false, msg: "Invalid password" };
        }

        var token = jwt.sign({ id: user._id, role: user.role }, key, {
            expiresIn: 86400 // expires in 24 hours
        });

        return { status: true, token: token };
    } catch (error) {
        console.log(error);
        throw new Error('Error during user validation');
    }
}; 