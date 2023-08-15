const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model
const router = express.Router();

// Your other routes and middleware can go here

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret, // Make sure jwtSecret is defined
          {},
          (err, token) => {
            if (err) {
              res.status(500).json({ error: 'Error creating JWT token' });
            } else {
              res
                .cookie('token', token)
                .json({ success: true, user: userDoc });
            }
          }
        );
      } else {
        res.status(422).json({ error: 'Password is incorrect' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
