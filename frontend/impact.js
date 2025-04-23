const ctx = document.getElementById('impactChart').getContext('2d');

fetch('http://localhost:3000/purchases/impact')
  .then(res => res.json())
  .then(data => {
    const labels = data.map(row => row.name);
    const impacts = data.map(row => row.total_impact.toFixed(2));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Impact CO₂ (kg / semaine)',
          data: impacts,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'kg CO₂ / semaine'
            }
          }
        }
      }
    });
  });
