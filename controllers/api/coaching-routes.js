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
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one coaching session

router.get('/:id', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new coaching session

router.post('/', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update coaching session

router.put('/:id', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete coaching session

router.delete('/:id', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
