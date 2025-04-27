const apiUsers = '/api/users';
const apiPurchases = '/api/purchases';
const apiProducts = '/api/products';

const totalUsers = document.getElementById('total-users');
const totalPurchases = document.getElementById('total-purchases');
const chartCanvas = document.getElementById('topProductsChart').getContext('2d');

async function loadDashboard() {
  // Total utilisateurs
  const users = await fetch(apiUsers).then(res => res.json());
  totalUsers.textContent = users.length;

  // Total achats
  const purchases = await fetch(apiPurchases).then(res => res.json());
  totalPurchases.textContent = purchases.length;

  // Calcul du top 3 produits les plus polluants
  const productImpact = {};

  purchases.forEach(p => {
    const key = p.product_name;
    if (!productImpact[key]) productImpact[key] = 0;
    productImpact[key] += p.quantity_per_week;
  });

  const products = await fetch(apiProducts).then(res => res.json());

  const merged = Object.entries(productImpact).map(([name, quantity]) => {
    const prod = products.find(p => p.name === name);
    return { name, impact: prod ? prod.impact_co2 * quantity : 0 };
  });

  const top3 = merged.sort((a, b) => b.impact - a.impact).slice(0, 3);

  // Chart
  new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: top3.map(p => p.name),
      datasets: [{
        label: 'Impact CO₂ total (kg)',
        data: top3.map(p => p.impact.toFixed(2)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

loadDashboard();
