const router = require('express').Router();
// TODO Import user routes when RD has finsihed them
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// create a user
router.post('/', async (req, res) => {
  try {
    const createUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      manager_id: req.body.manager_id,
    };
    const salt = await bcrypt.genSalt(10);
    // Update the password key with new hashed password. SaltRounds is 10 (default value)
    createUser.password = await bcrypt.hash(req.body.password, salt);
    // write user data to database
    const dbUserData = await User.create(createUser);
    // add info to req.session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = dbUserData.id;
      req.session.firstName = dbUserData.first_name;
      req.session.lastName = dbUserData.last_name;
      req.session.email = dbUserData.email;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userRequest = req.body;
    const dbUser = await User.findOne({ where: { email: req.body.email } });
    // If we find a user with that email, we can go ahead and compare passwords.
    if (dbUser) {
      const passwordToCheck = await bcrypt.compare(
        // Password given in request; need to check against our hashed password stored in dbUserData
        userRequest.password,
        dbUser.password
      );
      // If passwords match we get a true from the compare function and we get the logging in message.
      if (passwordToCheck) {
        res.status(200).json({ message: 'Now logging in' });
        req.session.loggedIn = true;
        res.redirect('/');
      } else {
        res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      res
        .status(400)
        .json({ error: 'No user with that email. Please try again' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Not sure about if I need to clear coookie here

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.clearCookie();
      res.redirect('/');
    });
  }
});

module.exports = router;
