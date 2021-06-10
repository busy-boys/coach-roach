const { User } = require('../models');

const userData = [
  {
    first_name: 'Mick',
    last_name: 'Jagger',
    email: 'lovestosnort69@hotmail.com',
    password: 'cocaine',
    role: 'Singer',
    manager: 'Allen Klein',
  },
  {
    first_name: 'Keith',
    last_name: 'Richards',
    email: 'loveguitar@hotmail.com',
    password: 'patti',
    role: 'Guitarist',
    manager: 'Allen Klein',
  },
  {
    first_name: 'Brian',
    last_name: 'Jones',
    email: 'jonesy@hotmail.com',
    password: 'alsococaine',
    role: 'Guitarist',
    manager: 'Allen Klein',
  },
];

const seedUserData = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
  });
};

module.exports = seedUserData;
