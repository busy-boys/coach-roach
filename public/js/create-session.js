const createSessionForm = document.querySelector('#booking-form');

createSessionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event.target);
  const data = new FormData(event.target);
  const bookingData = Object.fromEntries(data.entries());
  console.log(bookingData);
  try {
    const res = await axios.post('/api/coaching', bookingData);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
});
