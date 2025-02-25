document.getElementById('LoginForm').addEventListener('submit', (event) => {
  event.preventDefault(); 

  const username = document.getElementById('Username').value;
  const password = document.getElementById('Password').value;
  const errorMessage = document.getElementById('errorMessage');

  // Post to /login endpoint
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        //If login is valid then it will give message!
        errorMessage.textContent = 'Login successful!';
        errorMessage.style.color = 'green';

        // Then redirects
        setTimeout(() => {
          window.location.href = 'HomePage.html';
        }, 1000);
      } else {
        // If not, this message pops up,
        errorMessage.textContent = data.message || 'Invalid username or password';
        errorMessage.style.color = 'red';
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      errorMessage.textContent = 'An error occurred.';
      errorMessage.style.color = 'red'; //To give it dynamicism
    });
});

// Register button just takes you to RegisterPage.html after clicking
document.getElementById('SignUpBtn').addEventListener('click', () => {
  window.location.href = 'RegisterPage.html';
});
