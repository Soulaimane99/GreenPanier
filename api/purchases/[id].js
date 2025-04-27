import db from '../../config/db';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { quantity_per_week } = req.body;
    const sql = 'UPDATE purchases SET quantity_per_week = ? WHERE id = ?';
    db.query(sql, [quantity_per_week, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: 'Achat mis à jour' });
    });
  } else if (req.method === 'DELETE') {
    const sql = 'DELETE FROM purchases WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: 'Achat supprimé' });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
