import db from '../../config/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: 'Utilisateur créé', id: result.insertId });
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
