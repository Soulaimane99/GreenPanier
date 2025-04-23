const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;

  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (res.status === 200) {
    const user = await res.json();
    localStorage.setItem('user', JSON.stringify(user));
    alert('Bienvenue ' + user.name);
    window.location.href = 'index.html';
  } else {
    alert('Identifiants incorrects');
  }
});
