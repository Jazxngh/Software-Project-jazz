const registerForm = document.getElementById('RegisterForm');
const registerError = document.getElementById('registerError');

// Wait for form submission
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  //fetch all values of inputs as you need them
  const username = document.getElementById('rUsername').value;
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;

  // Post to /register
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // if pass
        registerError.style.color = 'green';
        registerError.textContent = 'Registered successfully! Redirecting...';
        
        // redirect back to login
        setTimeout(() => {
          window.location.href = 'LoginPage.html';
        }, 1500);
      } else {
        // if fail
        registerError.style.color = 'red';
        registerError.textContent = data.message || 'Error registering user.';
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      registerError.style.color = 'red';
      registerError.textContent = 'An error occurred.';
    });
});

//==========================================================================================================================================================
//Explaination

//So naturally it works by 

// Enter Details in register page 
// --> Register up  --> Saves it into database in server.js via post /register
// --> go to login --> Add the details that's been registered up 
// --> fetch's the username and password --> uses post /login to validate it in server.js
// --> and bingo it works!

// ====  If it fails, an error message is shown, and the user can try again!

