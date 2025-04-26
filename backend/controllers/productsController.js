const db = require('../config/db');

// CREATE
exports.createProduct = (req, res) => {
  const { name, impact_co2 } = req.body;
  const sql = 'INSERT INTO products (name, impact_co2) VALUES (?, ?)';
  db.query(sql, [name, impact_co2], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Produit créé', id: result.insertId });
  });
};

// READ
exports.getAllProducts = (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// UPDATE
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, impact_co2 } = req.body;
  const sql = 'UPDATE products SET name = ?, impact_co2 = ? WHERE id = ?';
  db.query(sql, [name, impact_co2, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Produit mis à jour' });
  });
};

// DELETE
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Produit supprimé' });
  });
};
