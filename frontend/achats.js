const apiPurchases = 'http://localhost:3000/purchases';
const apiUsers = 'http://localhost:3000/users';
const apiProducts = 'http://localhost:3000/products';

const form = document.getElementById('purchase-form');
const userSelect = document.getElementById('user_id');
const productSelect = document.getElementById('product_id');
const table = document.getElementById('purchase-table');

// Charger utilisateurs et produits pour le formulaire
async function loadFormOptions() {
  const users = await fetch(apiUsers).then(res => res.json());
  const products = await fetch(apiProducts).then(res => res.json());

  userSelect.innerHTML = users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
  productSelect.innerHTML = products.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// Ajouter un achat
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user_id = form.user_id.value;
  const product_id = form.product_id.value;
  const quantity_per_week = form.quantity_per_week.value;

  await fetch(apiPurchases, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, product_id, quantity_per_week })
  });

  form.reset();
  loadPurchases();
});

// Charger tous les achats
async function loadPurchases() {
  const res = await fetch(apiPurchases);
  const purchases = await res.json();

  table.innerHTML = '';
  purchases.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.user_name}</td>
      <td>${p.product_name}</td>
      <td><input type="number" value="${p.quantity_per_week}" onchange="updatePurchase(${p.id}, this.value)" /></td>
      <td><button onclick="deletePurchase(${p.id})">🗑️</button></td>
    `;
    table.appendChild(row);
  });
}

// Modifier un achat
async function updatePurchase(id, quantity) {
  await fetch(`${apiPurchases}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity_per_week: quantity })
  });
  loadPurchases();
}

// Supprimer un achat
async function deletePurchase(id) {
  if (confirm('Supprimer cet achat ?')) {
    await fetch(`${apiPurchases}/${id}`, { method: 'DELETE' });
    loadPurchases();
  }
}

// Initialisation
loadFormOptions();
loadPurchases();
