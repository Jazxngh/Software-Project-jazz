//Giving Button Functionality
const userBtn = document.getElementById('S-UserBtn');
const adminSupportBtn = document.getElementById('S-AdminSupportBtn');

// Both Event listener 
userBtn.addEventListener('click', function() {
  // Takes you to the standard page
  window.location.href = 'LoginPage.html';
});

adminSupportBtn.addEventListener('click', function() {
  // Takes you to admin/support page
  window.location.href = 'ASLoginPage.html';
});
