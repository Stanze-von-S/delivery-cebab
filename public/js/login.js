const form = document.getElementById('signinForm');
function nullForm(form) {
  form.email.value = '';
  form.password.value = '';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const user = {
    email: form.email.value,
    password: form.password.value,
  };
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (data.message) {
    nullForm(form);
    window.location.href = data.redirect;
  } else {
    const p = document.createElement('p');
    p.innerText = 'Вы ввели неправильные учётные данные. Введите корректные данные электронной почты и пароля.';
    form.after(p);
    nullForm(form);
  }
});
