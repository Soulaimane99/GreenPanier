const apiUrl = 'http://localhost:3000/users';

const form = document.getElementById('user-form');
const table = document.getElementById('user-table');

// Ajouter un utilisateur
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  form.reset();
  loadUsers();
});

// Charger tous les utilisateurs
async function loadUsers() {
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();
  const table = document.getElementById("user-table");
  table.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = 
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td> 
      <td><button onclick="deleteUser(${user.id})">🗑️</button></td>
    ;
    table.appendChild(row);
  });

// Modifier un utilisateur (nom ou email)
async function updateUser(id, value, field) {
  const user = await fetch(`${apiUrl}`).then(res => res.json());
  const found = user.find(u => u.id === id);
  const body = { name: found.name, email: found.email };
  body[field] = value;

  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  loadUsers();
}

// Supprimer un utilisateur
async function deleteUser(id) {
  if (confirm('Supprimer cet utilisateur ?')) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadUsers();
  }
}

// Lancer le chargement initial
loadUsers();
