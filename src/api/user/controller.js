const {model} = require('./model');
const UserController = {};

const jwt = require('jsonwebtoken');
const config= require('../../services/jwt');

// >> Here will be the
// endpoints for the Users.
//Get user
UserController.getUser = async (req, res) => {
    //Header token
    const token = req.headers['x-access-token'];
    //If no token is provided, return 401
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }

    //Verify token
    const decoded = jwt.verify(token, config.secret);
    //Find user by id, password not passing
    const user = await model.findById(decoded.id, {password: 0});
    //If user not found, return 404
    if(!user){
        return res.status(404).send('No user found');
    }
    //Return user info
    res.json(user);
}
    /*model.find({}, {'__v': 0})
    .then((users) => res.json({ users }));*/

//Sign up user
UserController.saveUser = async (req, res) => {
    //Request body
    const user = req.body;
    console.log(user);
    //Create user
    const created = await model.create(user);
    //Create token
    const token = jwt.sign({id: created._id}, config.secret, {
        expiresIn: 1800
    })
    //Return token
    res.json({  auth: true,
                token: token});
}

//Sign In user
UserController.signInUser = async (req, res) => {
    //Request username and password from user
    const {username, password} = req.body;
    console.log(username, password)
    //Find username
    const user = await model.findOne({username: username})
    //If username not found, return 404
    if(!user){
        return res.status(404).send('Username not found');
    }
    //Validate password
    const passIsValid = await user.matchPassword(password);
    //If password is false, return 401
    if(!passIsValid){
        return res.status(401).json({  auth: false,
                                token: null});
    }
    //Return token
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 1800
    });
    
    res.json({  auth: true,
                token: token});
}

module.exports = UserController;