const db = require('../config/db');

// CREATE 
exports.createUser = (req, res) => { const { name, email, password } = req.body; const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'; db.query(sql, [name, email, password], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(201).json({ message: 'Utilisateur créé', id: result.insertId }); }); };

// READ 
exports.getAllUsers = (req, res) => { const sql = 'SELECT * FROM users'; db.query(sql, (err, results) => { if (err) return res.status(500).json({ error: err }); res.status(200).json(results); }); };

// UPDATE 
exports.updateUser = (req, res) => { const { id } = req.params; const { name, email } = req.body; const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'; db.query(sql, [name, email, id], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(200).json({ message: 'Utilisateur mis à jour' }); }); };

// DELETE 
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
  
    // 1. Supprimer ses achats
    const deletePurchasesSql = "DELETE FROM purchases WHERE user_id = ?";
    db.query(deletePurchasesSql, [userId], (err) => {
      if (err) return res.status(500).json({ error: err });
  
      // 2. Supprimer l’utilisateur ensuite
      const deleteUserSql = "DELETE FROM users WHERE id = ?";
      db.query(deleteUserSql, [userId], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
  
        res.status(200).json({ message: "Utilisateur et ses achats supprimés avec succès" });
      });
    });
  };