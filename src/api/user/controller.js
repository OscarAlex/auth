const {model}= require('./model');
const UserController = {};

// >> Here will be the
// endpoints for the Users.
UserController.getUser = (req, res) =>
    model.find({}, {'__v': 0})
    .then((users) => res.json({ users }));

UserController.saveUser = async (req, res) => {
    const user = req.body;
    console.log(user);
    const created = await model.create(user);
    res.json({created});
}

module.exports = UserController;