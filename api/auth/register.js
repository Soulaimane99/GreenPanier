import db from '../../config/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const values = [name, email, password, role || 'user'];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: 'Utilisateur inscrit', id: result.insertId });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
