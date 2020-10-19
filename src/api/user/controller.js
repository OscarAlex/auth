const model= require('./model');
const UserController = {};

UserController.get = (req, res) =>
    model.find({}, {'__v': 0})
    .then((users) => res.json({ users }));

UserController.save = async (req, res) => {
    const user = req.body;
    console.log(user);
    const created = await model.create(user);
    res.json({created});
}
// >> Here will be the
// endpoints for the Users.

module.exports = UserController;