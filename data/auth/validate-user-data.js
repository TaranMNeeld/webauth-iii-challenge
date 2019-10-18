function validateUserData(req, res, next) {
    const user = req.body;
    if (!user.username) {
        res.status(400).json({ errorMessage: 'missing required username field' });
    } else if (!user.password) {
        res.status(400).json({ errorMessage: 'missing required password field' });
    } else if (!user.department) {
        user.department = 'pending';
        console.log('user validated');
        next();
    } else {
        console.log('user validated');
        next();
    }
}

module.exports = validateUserData;