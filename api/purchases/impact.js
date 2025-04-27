import db from '../../config/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sql = `
      SELECT users.name, SUM(products.impact_co2 * purchases.quantity_per_week) AS total_impact
      FROM purchases
      JOIN users ON purchases.user_id = users.id
      JOIN products ON purchases.product_id = products.id
      GROUP BY users.name
    `;
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
