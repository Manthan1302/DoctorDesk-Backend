const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");

const adminAuth = async (request, response, next) => {
    try {
        const token = request.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "newuser");
        const admin = await Admin.findOne({ _id: decoded._id });
        if (!admin) {
           return response.status(400).json("only admin can access");
          }
        next();
    } catch (error) {
        console.log("error: ", error);
    }
};

module.exports = adminAuth;
