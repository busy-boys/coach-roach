// signup new user
//! requires axios to be loaded from a CDN before this script is loaded!!!!
// signup form.
const loginForm = document.querySelector('#login-form');

// handle signup submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event.target);
  const data = new FormData(event.target);
  const loginData = Object.fromEntries(data.entries());
  console.log(loginData);
  try {
    const response = await axios.post('/api/user/login', loginData);
    console.log(response);
    // reload page
    window.location.assign('/');
  } catch (error) {
    console.error(error);
  }
});
