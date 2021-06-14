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
  try {
    const response = await axios.post('/api/users', signupData);
    console.log(response);
    // reload page
    // window.location.assign('/');
  } catch (error) {
    console.error(error);
  }
});
