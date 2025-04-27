const apiPurchases = '/api/purchases';
const apiUsers = '/api/users';
const apiProducts = '/api/products';

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
  const product_id = form.product_id.value;
  const quantity_per_week = form.quantity_per_week.value;
  const user_id = JSON.parse(localStorage.getItem('user')).id;

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
  const user = JSON.parse(localStorage.getItem("user"));

  table.innerHTML = '';
  purchases
    .filter(p => user.role === 'admin' || p.user_id === user.id)
    .forEach(purchase => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${purchase.id}</td>
        <td>${purchase.user_name}</td>
        <td>${purchase.product_name}</td>
        <td>${purchase.quantity_per_week}</td>
        <td><button onclick="deletePurchase(${purchase.id})">🗑️</button></td>
      `;
      table.appendChild(row);
    });
}

// Remplir le select des produits
async function loadProducts() {
  const res = await fetch(apiProducts);
  const products = await res.json();

  const selectProduct = document.getElementById('product_id');
  selectProduct.innerHTML = ''; // Vider avant de remplir

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    selectProduct.appendChild(option);
  });
}

// Appeler loadProducts au chargement
loadProducts();

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
