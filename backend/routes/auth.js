const express = require('express');
const router = express.Router();
const db = require('../config/db');

// REGISTER – créer un utilisateur
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, role || 'user'], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Utilisateur inscrit' });
  });
});

// LOGIN – vérifier les infos
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const user = results[0];
    delete user.password;
    res.status(200).json(user); // renvoyer le user sans le mot de passe
  });
});

module.exports = router;
