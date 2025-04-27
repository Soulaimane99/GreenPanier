import db from '../../config/db';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: 'Utilisateur mis à jour' });
    });
  } else if (req.method === 'DELETE') {
    // Supprimer d'abord les achats associés à l'utilisateur
    const deletePurchases = 'DELETE FROM purchases WHERE user_id = ?';
    db.query(deletePurchases, [id], (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const deleteUser = 'DELETE FROM users WHERE id = ?';
      db.query(deleteUser, [id], (err2) => {
        if (err2) {
          return res.status(500).json({ error: err2 });
        }
        res.status(200).json({ message: 'Utilisateur et achats supprimés' });
      });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
