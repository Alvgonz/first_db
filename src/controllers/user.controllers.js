const catchError = require('../utils/catchError');
const User = require('../models/Users');

const getAll = catchError(async(req, res) => {
    const result = await User.findAll();
    //SELECT * FROM USERS;
    return res.status(200).json(result);
});

module.exports = {
    getAll
}