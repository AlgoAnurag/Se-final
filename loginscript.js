// Show the login form and hide the signup form
function showLogin() {
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
}

// Show the signup form and hide the login form
function showSignup() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
}

// Placeholder login function
function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email && password) {
    alert(`Logged in as ${email}`);
    window.location.href = "index.html";
  } else {
    alert('Please fill in all fields');
  }
}

// Placeholder signup function
function signupUser() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  if (name && email && password) {
    alert(`Signed up successfully! Welcome, ${name}`);
  } else {
    alert('Please fill in all fields');
  }
}
