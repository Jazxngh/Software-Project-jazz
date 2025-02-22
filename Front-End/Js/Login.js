// To prevent form submitting
document.getElementById('LoginForm').addEventListener('submit', function(event) { 
    event.preventDefault(); 

    var username = document.getElementById('Username').value; //The identifier in html is being used as a variable here
    var password = document.getElementById('Password').value;
    var errorMessage = document.getElementById('errorMessage');

    //This is for field validation
    if (username === '' || password === '') { 
        errorMessage.textContent = 'Fill in both fields'; //This just means if you have empty gaps in '' then it will pop this message
        errorMessage.style.color = 'red'; // Red if fail 
    } else if (username === 'Jazz' && password === 'password2311') { //example details to log in, if not then its invalid
        errorMessage.textContent = 'Login successful';
        errorMessage.style.color = 'green'; //Green for Success

        // Takes you to index.html
        setTimeout(function() {
            window.location.href = 'index.html'; // Takes you to index.html, window.location.href takes you to any html pages
        }, 1000); // 1 second loading time
    } else {
        errorMessage.textContent = 'Invalid username or password, Please try again';
        errorMessage.style.color = 'red'; //Samething, red to show that its invalid and wrong
    }
});

//Register Redirecting button 

const signUpButton = document.getElementById('SignUpBtn');
const form = document.getElementById('LoginForm');
const data = {
  formSubmissionPrevented: false
};

form.addEventListener('submit', (event) => {
  if (event.target === form) {
    event.preventDefault();
    data.formSubmissionPrevented = true;
  }
});

signUpButton.addEventListener('click', () => {
  window.location.href = 'RegisterPage.html';
});