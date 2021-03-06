const router = require('express').Router();
const { User, CoachingSession } = require('../../models');

// The /coaching endpoint

// Need the following
// POST /coaching
// GET /coaching/
// GET /coaching/:id
// PUT /coaching/:id
// DELETE /coaching/:id

// Get all coaching sessions

router.get('/', async (req, res) => {
  try {
    const coachingData = await CoachingSession.findAll({
      include: [
        {
          model: User,
          as: 'senior_coordinator',
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: User,
          as: 'superintendent',
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: User,
          as: 'supervisor',
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });
    return res.status(200).json(coachingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one coaching session

router.get('/:id', async (req, res) => {
  try {
    const coachingData = await CoachingSession.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'senior_coordinator',
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: User,
          as: 'superintendent',
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: User,
          as: 'supervisor',
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });

    if (!coachingData) {
      res.status(404).json({ message: 'No session found with that ID' });
      return;
    }
    return res.status(200).json(coachingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new coaching session

router.post('/', async (req, res) => {
  try {
    const coachingData = await CoachingSession.create({
      topic: req.body.topic,
      start_time: req.body.date,
      duration: req.body.duration,
      location: req.body.location,
      senior_coordinator_id: req.body.senior_coordinator_id,
      supervisor_id: req.body.supervisor_id,
      superintendent_id: req.body.superintendent_id,
    });
    console.log(coachingData);
    return res.status(200).json(coachingData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update coaching session

router.put('/:id', async (req, res) => {
  try {
    const coachingData = await CoachingSession.update(
      {
        complete: req.body.complete,
        senior_coordinator_signedOff: req.body.senior_coordinator_signedOff,
        supervisor_signedOff: req.body.supervisor_signedOff,
        superintendent_signedOff: req.body.superintendent_signedOff,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(200).json(coachingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete coaching session

router.delete('/:id', async (req, res) => {
  try {
    const coachingData = await CoachingSession.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json(coachingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
