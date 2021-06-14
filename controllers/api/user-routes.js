const router = require('express').Router();
// TODO Import user routes when RD has finsihed them
const { User } = require('../../models');

// create a user
router.post('/', async (req, res) => {
  try {
    // write user data to database
    const dbUserData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      manager: req.body.role,
    });
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

module.exports = router;
