const formSignUp = document.getElementById('signupForm');

formSignUp.addEventListener('submit', async (event) => {
  const user = {
    username: formSignUp.username,
    email: formSignUp.email,
    password: formSignUp.password,
    phone: formSignUp.phone,
    role: formSignUp.role,
  };
  const response = await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const json = response.json();
});

