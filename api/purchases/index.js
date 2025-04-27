import db from '../../config/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sql = `
      SELECT 
        purchases.id,
        purchases.user_id,
        users.name AS user_name,
        purchases.product_id,
        products.name AS product_name,
        purchases.quantity_per_week
      FROM purchases
      JOIN products ON purchases.product_id = products.id
      JOIN users ON purchases.user_id = users.id
    `;
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    const { user_id, product_id, quantity_per_week } = req.body;
    const sql = 'INSERT INTO purchases (user_id, product_id, quantity_per_week) VALUES (?, ?, ?)';
    db.query(sql, [user_id, product_id, quantity_per_week], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: 'Achat ajouté', id: result.insertId });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
