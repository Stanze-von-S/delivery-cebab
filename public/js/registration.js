const formSignUp = document.getElementById('signupForm');

formSignUp.addEventListener('submit', async (event) => {
  event.preventDefault();

  const user = {
    username: formSignUp.username.value,
    email: formSignUp.email.value,
    password: formSignUp.password.value,
    phone: formSignUp.phone.value,
    role: formSignUp.role.value,
  };
  const response = await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const responseJson = await response.json();
  // if (responseJson.error)

  // window.location.href = '/login';
});
