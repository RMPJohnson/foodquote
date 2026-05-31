const User = require("../models/userModel");
const getLoginUsersController = async (req, res) => {
    try {
        const users = await User.findById({_id : req.user.id},{_id:0,password:0});
        if (!users) {
            return res.status(404).json({
                success: false,
                error: "User does not exist"
            })
        }
        res.status(200).send({
            status: "success",
            data: users,
            message: "user information is retrieved"

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error occurred in user',
            error: error,
        })
    }
}
module.exports = getLoginUsersController;
