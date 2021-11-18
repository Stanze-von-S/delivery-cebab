const form = document.getElementById('signupForm');
function nullForm(form) {
  form.username.value = '';
  form.email.value = '';
  form.password.value = '';
  form.phone.value = '';
  form.role.value = '';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const user = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
    phone: form.phone.value,
    role: form.role.value,
  };
  const response = await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const responseJson = await response.json();
  if (responseJson.message !== 'error') {
    nullForm(form);
    window.location.href = '/login';
  } else {
    nullForm(form);
    const p = document.createElement('p');
    p.innerText = 'В логине, адресе электронной почты или номере телефона есть совпадения с уже существующими аккаунтами. Пожалуйста, повторите попытку регистрации.';
    form.after(p);
  }
});
