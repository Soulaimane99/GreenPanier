const db = require('../config/db');

// CREATE 
exports.createUser = (req, res) => { const { name, email, password } = req.body; const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'; db.query(sql, [name, email, password], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(201).json({ message: 'Utilisateur créé', id: result.insertId }); }); };

// READ 
exports.getAllUsers = (req, res) => { const sql = 'SELECT * FROM users'; db.query(sql, (err, results) => { if (err) return res.status(500).json({ error: err }); res.status(200).json(results); }); };

// UPDATE 
exports.updateUser = (req, res) => { const { id } = req.params; const { name, email } = req.body; const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'; db.query(sql, [name, email, id], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(200).json({ message: 'Utilisateur mis à jour' }); }); };

// DELETE 
exports.deleteUser = (req, res) => { const { id } = req.params; const sql = 'DELETE FROM users WHERE id = ?'; db.query(sql, [id], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(200).json({ message: 'Utilisateur supprimé' }); }); };