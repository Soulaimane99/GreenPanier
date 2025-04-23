const db = require('../config/db');

// CREATE
exports.createPurchase = (req, res) => { const { user_id, product_id, quantity_per_week } = req.body; const sql = 'INSERT INTO purchases (user_id, product_id, quantity_per_week) VALUES (?, ?, ?)'; db.query(sql, [user_id, product_id, quantity_per_week], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(201).json({ message: 'Achat ajouté', id: result.insertId }); }); };

// READ 
exports.getAllPurchases = (req, res) => { const sql = 'SELECT purchases.id, users.name AS user_name, products.name AS product_name, quantity_per_week FROM purchases JOIN users ON purchases.user_id = users.id JOIN products ON purchases.product_id = products.id '; db.query(sql, (err, results) => { if (err) return res.status(500).json({ error: err }); res.status(200).json(results); }); };

// UPDATE
exports.updatePurchase = (req, res) => { const { id } = req.params; const { quantity_per_week } = req.body; const sql = 'UPDATE purchases SET quantity_per_week = ? WHERE id = ?'; db.query(sql, [quantity_per_week, id], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(200).json({ message: 'Achat mis à jour' }); }); };

// DELETE 
exports.deletePurchase = (req, res) => { const { id } = req.params; const sql = 'DELETE FROM purchases WHERE id = ?'; db.query(sql, [id], (err, result) => { if (err) return res.status(500).json({ error: err }); res.status(200).json({ message: 'Achat supprimé' }); }); };

// GET /purchases/impact → impact carbone total par utilisateur
exports.getImpactByUser = (req, res) => {
    const sql = `
      SELECT users.name, SUM(products.impact_co2 * purchases.quantity_per_week) AS total_impact
      FROM purchases
      JOIN users ON purchases.user_id = users.id
      JOIN products ON purchases.product_id = products.id
      GROUP BY users.name
    `;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json(results);
    });
  };
  