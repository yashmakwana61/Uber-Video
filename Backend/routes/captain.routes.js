const captainController = require('../controllers/captain.controller');
const express  = require('express');
const router = express.Router();
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({ min:3 }).withMessage('Color must be atleast 3 Characters long'),
    body('vehicle.plate').isLength({ min:3 }).withMessage('Plate must be atleast 3 Characters long'),
    body('vehicle.capacity').isInt({ min:1 }).withMessage('Capacity must be atleast 3 Characters long'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto']).withMessage('Invalid')
],
    captainController.registerCaptain
);

module.exports = router;