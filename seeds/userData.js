const { User } = require('../models');

const userData = [
  {
    first_name: 'Allen',
    last_name: 'Klein',
    email: 'allenkey@hotmail.com',
    password: 'password123',
    role: 'Superintendent',
    manager_id: null,
  },
  {
    first_name: 'Mick',
    last_name: 'Jagger',
    email: 'lovestosnort69@hotmail.com',
    password: 'cocaine',
    role: 'Supervisor',
    manager_id: 1,
  },
  {
    first_name: 'Keith',
    last_name: 'Richards',
    email: 'loveguitar@hotmail.com',
    password: 'patti',
    role: 'Senior Coodinator',
    manager_id: 2,
  },
  {
    first_name: 'Brian',
    last_name: 'Jones',
    email: 'jonesy@hotmail.com',
    password: 'alsococaine',
    role: 'Senior Coodinator',
    manager_id: 2,
  },
];

const seedUserData = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
  });
};

module.exports = seedUserData;
