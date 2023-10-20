const Admin = require("../model/adminModel");
const HttpError = require("./HttpError");
const jwt = require("jsonwebtoken");

const adminAuth = async (request, response, next) => {
    try {
        const token = request.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "newuser");
        const admin = await Admin.findOne({ _id: decoded._id });
        if (!admin) {
            const error = new HttpError(404, "only admin can access");
            console.log("error: ", error);
            return { error };
        }
        next();
    } catch (err) {
        const error = new HttpError(
            500,
            "something went Wrong in admin authentication"
        );
        console.log("error: ", error);
        return error;
    }
};

module.exports = adminAuth;
