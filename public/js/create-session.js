// booking session form
const createSessionForm = document.querySelector('#booking-form');

createSessionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  //   console.log(event.target);
  //   const data = new FormData(event.target);
  //   const bookingData = Object.fromEntries(data.entries());
  const dummyData = {
    date: '2021-06-30T12:20',
    duration: '120',
    location: 'Murdoch',
    senior_coordinator_id: null,
    superintendent_id: null,
    supervisor_id: null,
    topic: 'Safety Hazard',
  };
  //   const d = JSON.stringify(dummyData);
  console.log("I don't fucking know what's wrong", dummyData);
  try {
    console.log('before request');
    const res = await axios.post('/api/coaching', dummyData);
    console.log('after request');
    console.log(res);
  } catch (err) {
    console.error(err);
  }
});
