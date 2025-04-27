import db from '../../config/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }

      const user = results[0];
      delete user.password;
      res.status(200).json(user);
    });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
