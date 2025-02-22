const registerForm = document.getElementById('RegisterForm');
const registerError = document.getElementById('registerError');

// Wait for form submission
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  //fetch all values of inputs
  const username = document.getElementById('rUsername').value;
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;

  // POST to /register
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // pass
        registerError.style.color = 'green';
        registerError.textContent = 'Registered successfully! Redirecting...';
        
        // redirect back to login
        setTimeout(() => {
          window.location.href = 'LoginPage.html';
        }, 1500);
      } else {
        // fail
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
