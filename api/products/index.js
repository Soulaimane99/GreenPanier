import db from '../../config/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    const { name, impact_co2 } = req.body;
    const sql = 'INSERT INTO products (name, impact_co2) VALUES (?, ?)';
    db.query(sql, [name, impact_co2], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: 'Produit créé', id: result.insertId });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
