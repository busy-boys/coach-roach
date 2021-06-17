// select all signoff buttons
const allSignOffCells = document.querySelectorAll('.signed-off');

// select all signon buttons
const allSignOnCells = document.querySelectorAll('.signed-on');

allSignOffCells.forEach(async (cell) => {
  cell.addEventListener('click', async (e) => {
    const { sessionId, userRole } = e.target.dataset;
    await axios.put(`/api/coaching/${sessionId}`, {
      [userRole]: true,
    });
    window.location.reload();
  });
});

allSignOnCells.forEach((cell) => {
  cell.addEventListener('click', async (e) => {
    const { sessionId, userRole } = e.target.dataset;
    await axios.put(`/api/coaching/${sessionId}`, {
      [userRole]: false,
    });
    window.location.reload();
  });
});

// complete: req.body.complete,
// senior_coordinator_signedOff: req.body.senior_coordinator_signedOff,
// supervisor_signedOff: req.body.supervisor_signedOff,
// superintendent_signedOff: req.body.superintendent_signedOff,
