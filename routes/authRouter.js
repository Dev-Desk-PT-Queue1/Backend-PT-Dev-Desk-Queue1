const express = require('express')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

const router = express.Router();

const Tickets = require('../models/ticketsModel')
const Users = require('../models/usersModel')
const { authenticate } = require('../middleware/middleware');

router.use(express.json());

router.get('/users', authenticate, async (req, res) => {
  const users = await Users.getAllUsers();
  if(users){
    res.status(200).json(users);
  } else {
    res.status(404).json({msg: 'No users found'});
  }
});

router.get('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const user = await Users.getUserByID(id);
  if(user){
    res.status(200).json(user);
  } else {
    res.status(404).json({msg: 'No user found'});
  }
});

router.post('/register', async (req, res) => {
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 12);
  const user = await Users.register(newUser);
  if(user){
    res.status(200).json({msg: 'User was created succesfully'});
  } else {
    res.status(500).json({msg: 'Unable to create user'});
  }
});

router.post('/login', async (req, res) => {
  const userLogin = req.body;
  const user = await Users.login(userLogin.username);
  if(user){
    if(bcrypt.compareSync(userLogin.password, user.password)){
      const token = generateToken(user);
      res.status(200).json({
          message: 'Login successful',
          token: token,
          user: {
            user_id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email                                    
          }
      })
    } else {
      res.status(404).json({msg: 'Invalid username or password'});
    }
    } else {
    res.status(500).json({msg: 'Login unsucessful'});
  }
});

generateToken = (user) => {
    const payload = {
        username: user.username,        
        user_id: user.id
    }
    const options = {
        expiresIn: '12h'
    }
    return jwt.sign(payload, jwtToken, options)
}

module.exports = router;