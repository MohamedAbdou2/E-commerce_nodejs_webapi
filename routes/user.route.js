const express = require('express');

let router = express.Router();

const {addUser,getAllUsers,getUserById,updateUserById,deleteUserById,login} = require('../controllers/user.controller');

const {auth, restrictTo} = require('../middlewares/auth');


router.route('/').get(auth,getAllUsers);

router.route('/:id').get(auth,getUserById).put(auth,updateUserById).delete(auth,deleteUserById);

router.route('/signup').post(addUser);

router.route('/login').post(login);

module.exports = router;