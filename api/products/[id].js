import db from '../../config/db';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, impact_co2 } = req.body;
    const sql = 'UPDATE products SET name = ?, impact_co2 = ? WHERE id = ?';
    db.query(sql, [name, impact_co2, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: 'Produit mis à jour' });
    });
  } else if (req.method === 'DELETE') {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: 'Produit supprimé' });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
