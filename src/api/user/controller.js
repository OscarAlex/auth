const {model} = require('./model');
const UserController = {};

const jwt = require('jsonwebtoken');
const config= require('../../services/jwt');

// >> Here will be the
// endpoints for the Users.
UserController.getUser = async (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }

    const decoded = jwt.verify(token, config.secret);
    const user = await model.findById(decoded.id, {password: 0});
    if(!user){
        return res.status(404).send('No user found');
    }

    res.json(user);
}
    
    /*model.find({}, {'__v': 0})
    .then((users) => res.json({ users }));*/


UserController.saveUser = async (req, res) => {
    const user = req.body;
    console.log(user);
    const created = await model.create(user);

    const token = jwt.sign({id: created._id}, config.secret, {
        expiresIn: 1800
    })

    res.json({  auth: true,
                token: token});
}

module.exports = UserController;