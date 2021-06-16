const { User } = require('../models');

const userData = [
  {
    id: 1001,
    first_name: 'Allen',
    last_name: 'Klein',
    email: 'allenkey@hotmail.com',
    password: 'password123',
    role: 'Superintendent',
    manager_id: null,
  },
  {
    id: 1002,
    first_name: 'Andrew',
    last_name: 'Oldham',
    email: 'thehamman@hotmail.com',
    password: 'petunia55',
    role: 'Superintendent',
    manager_id: null,
  },
  {
    id: 1003,
    first_name: 'Mick',
    last_name: 'Jagger',
    email: 'lovestosnort69@hotmail.com',
    password: 'cocaine',
    role: 'Senior Coordinator',
    manager_id: 1001,
  },
  {
    id: 1004,
    first_name: 'Keith',
    last_name: 'Richards',
    email: 'loveguitar@hotmail.com',
    password: 'patti',
    role: 'Senior Coordinator',
    manager_id: 1002,
  },
  {
    id: 1005,
    first_name: 'Brian',
    last_name: 'Jones',
    email: 'jonesy@hotmail.com',
    password: 'alsococaine',
    role: 'Senior Coordinator',
    manager_id: 1002,
  },
  {
    id: 1006,
    first_name: 'William',
    last_name: 'Wallace',
    email: 'screwthebrits@hotmail.com',
    password: 'haggus',
    role: 'Supervisor',
    manager_id: 1003,
  },
  {
    id: 1007,
    first_name: 'Abraham',
    last_name: 'Lincoln',
    email: 'besthat@hotmail.com',
    password: 'freetheslaves',
    role: 'Supervisor',
    manager_id: 1003,
  },
  {
    id: 1008,
    first_name: 'Bobby',
    last_name: 'Tables',
    email: 'droptable@hotmail.com',
    password: 'password',
    role: 'Supervisor',
    manager_id: 1004,
  },
  {
    id: 1009,
    first_name: 'Stevie',
    last_name: 'Nicks',
    email: 'themacattack@hotmail.com',
    password: 'dreams',
    role: 'Supervisor',
    manager_id: 1004,
  },
  {
    id: 1010,
    first_name: 'Warren',
    last_name: 'Zevon',
    email: 'arooooooooo@hotmail.com',
    password: 'qwerty123',
    role: 'Supervisor',
    manager_id: 1005,
  },
  {
    id: 1011,
    first_name: 'Rich',
    last_name: 'Evans',
    email: 'spacecop@hotmail.com',
    password: 'birthdayboy',
    role: 'Supervisor',
    manager_id: 1005,
  },
];

const seedUserData = async () => {
  await User.bulkCreate(userData, {
    //! DH: had to disable this as it was creating a race condition and stuffing up seeding :(
    // individualHooks: true,
  });
};

module.exports = seedUserData;
