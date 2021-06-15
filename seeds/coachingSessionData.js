const { CoachingSession } = require('../models');

const newDate1 = new Date('June 8, 2021 03:44:00');
const newDate2 = new Date('June 9, 2021 03:44:00');
const newDate3 = new Date('June 10, 2021 03:44:00');
const newDate4 = new Date('June 11, 2021 03:44:00');
const newDate5 = new Date('June 12, 2021 03:44:00');

const newDate6 = new Date('June 13, 2021 03:44:00');
const newDate7 = new Date('June 14, 2021 03:44:00');
const newDate8 = new Date('June 15, 2021 03:44:00');
const newDate9 = new Date('June 16, 2021 03:44:00');
const newDate10 = new Date('June 17, 2021 03:44:00');

const newDate11 = new Date('June 18, 2021 03:44:00');
const newDate12 = new Date('June 19, 2021 03:44:00');
const newDate13 = new Date('June 20, 2021 03:44:00');
const newDate14 = new Date('June 21, 2021 03:44:00');
const newDate15 = new Date('June 22, 2021 03:44:00');

const coachingData = [
  {
    start_time: newDate1,
    location: 'Perth',
    duration: 2,
    topic: 'Pre-start meeting',
    complete: true,
    signedOff: false,
    senior_coordinator_id: 3,
    supervisor_id: 6,
    superintendent_id: 1,
  },
  {
    start_time: newDate2,
    location: 'Woolgorong',
    duration: 4,
    topic: 'LiF meeting',
    complete: true,
    signedOff: true,
    senior_coordinator_id: 4,
    supervisor_id: 7,
    superintendent_id: null,
  },
  {
    start_time: newDate3,
    location: 'Broome',
    duration: 1,
    topic: 'Pre-task hazard assessment',
    complete: true,
    signedOff: false,
    senior_coordinator_id: 5,
    supervisor_id: 8,
    superintendent_id: 2,
  },
  {
    start_time: newDate4,
    location: 'Bunbury',
    duration: 5,
    topic: 'Critical risk management',
    complete: true,
    signedOff: true,
    senior_coordinator_id: 3,
    supervisor_id: 9,
    superintendent_id: null,
  },
  {
    start_time: newDate5,
    location: 'Derby',
    duration: 3,
    topic: 'Quality Safety interaction',
    complete: true,
    signedOff: false,
    senior_coordinator_id: 4,
    supervisor_id: 10,
    superintendent_id: null,
  },
  {
    start_time: newDate6,
    location: 'Ulladulla',
    duration: 2,
    topic: 'Safety spotlight',
    complete: true,
    signedOff: true,
    senior_coordinator_id: 5,
    supervisor_id: 6,
    superintendent_id: 1,
  },
  {
    start_time: newDate7,
    location: 'Singleton',
    duration: 1,
    topic: 'Pre-start meeting',
    complete: true,
    signedOff: true,
    senior_coordinator_id: 3,
    supervisor_id: 7,
    superintendent_id: 2,
  },
  {
    start_time: newDate8,
    location: 'Mount Barker',
    duration: 2,
    topic: 'Leadership in the Field',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 3,
    supervisor_id: 8,
    superintendent_id: null,
  },
  {
    start_time: newDate9,
    location: 'Coolgardie',
    duration: 4,
    topic: 'Pre-task hazard assessment',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 5,
    supervisor_id: 10,
    superintendent_id: 1,
  },
  {
    start_time: newDate10,
    location: 'Kwinana',
    duration: 3,
    topic: 'Critical risk management',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 5,
    supervisor_id: 6,
    superintendent_id: null,
  },
  {
    start_time: newDate11,
    location: 'Busselton',
    duration: 2,
    topic: 'Quality Safety interaction',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 4,
    supervisor_id: 6,
    superintendent_id: null,
  },
  {
    start_time: newDate12,
    location: 'Port Hedland',
    duration: 1,
    topic: 'Safety spotlight',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 3,
    supervisor_id: 10,
    superintendent_id: 2,
  },
  {
    start_time: newDate13,
    location: 'Mandurah',
    duration: 1,
    topic: 'Pre-start meeting',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 5,
    supervisor_id: 7,
    superintendent_id: 2,
  },
  {
    start_time: newDate14,
    location: 'Newman',
    duration: 5,
    topic: 'Leadership in the Field',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 4,
    supervisor_id: 6,
    superintendent_id: null,
  },
  {
    start_time: newDate15,
    location: 'Tom Price',
    duration: 3,
    topic: 'Pre-task hazard assessment',
    complete: false,
    signedOff: false,
    senior_coordinator_id: 4,
    supervisor_id: 10,
    superintendent_id: 1,
  },
];

const seedCoachingData = async () => {
  await CoachingSession.bulkCreate(coachingData, {
    individualHooks: true,
  });
};

module.exports = seedCoachingData;
