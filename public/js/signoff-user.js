// select all signoff buttons
const allSignOffCells = document.querySelectorAll('.signed-off');

// select all signon buttons
const allSignOnCells = document.querySelectorAll('.signed-on');

allSignOffCells.forEach(async (cell) => {
  cell.addEventListener(
    'click',
    async (event) => {
      const { sessionId, userRole } = event.target.dataset;
      await axios.put(`/api/coaching/${sessionId}`, {
        [userRole]: true,
      });
      window.location.reload();
    },
    { once: true }
  );
});

allSignOnCells.forEach((cell) => {
  cell.addEventListener(
    'click',
    async (event) => {
      const { sessionId, userRole } = event.target.dataset;
      await axios.put(`/api/coaching/${sessionId}`, {
        [userRole]: false,
      });
      window.location.reload();
    },
    { once: true }
  );
});

// complete: req.body.complete,
// senior_coordinator_signedOff: req.body.senior_coordinator_signedOff,
// supervisor_signedOff: req.body.supervisor_signedOff,
// superintendent_signedOff: req.body.superintendent_signedOff,
