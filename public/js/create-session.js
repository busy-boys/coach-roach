// booking session form
const createSessionForm = document.querySelector('#booking-form');

createSessionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event.target);
  const data = new FormData(event.target);
  const bookingData = Object.fromEntries(data.entries());
  console.log(bookingData);
  // create nulls from form.

  if (bookingData.senior_coordinator_id === 'null') {
    bookingData.senior_coordinator_id = null;
  }
  if (bookingData.superintendent_id === 'null') {
    bookingData.superintendent_id = null;
  }
  if (bookingData.supervisor_id === 'null') {
    bookingData.supervisor_id = null;
  }

  try {
    console.log('before request');
    const res = await axios.post('/api/coaching', bookingData);
    console.log('after request');
    console.log(res);
  } catch (err) {
    console.error(err);
  }
});
