// signup new user
//! requires axios to be loaded from a CDN before this script is loaded!!!!
// signup form.
const signupForm = document.querySelector('#signup-form');

// handle signup submission
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event.target);
  const data = new FormData(event.target);
  const signupData = Object.fromEntries(data.entries());
  if (signupData.manager_id === 'null') {
    signupData.manager_id = null;
  }
  try {
    const response = await axios.post('/api/user', signupData);
    console.log(response);
    // reload page
    window.location.assign('/');
  } catch (error) {
    console.error(error);
  }
});
