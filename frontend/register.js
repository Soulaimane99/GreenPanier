const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  if (res.status === 201) {
    alert('Compte créé, vous pouvez vous connecter');
    window.location.href = 'login.html';
  } else {
    alert('Erreur lors de l’inscription');
  }
});
