const express = require('express'); const router = express.Router(); const purchasesController = require('../controllers/purchasesController');

// Routes
router.post('/', purchasesController.createPurchase);
router.get('/', purchasesController.getAllPurchases); 
router.put('/:id', purchasesController.updatePurchase); 
router.delete('/:id', purchasesController.deletePurchase);

module.exports = router;

router.get('/impact', purchasesController.getImpactByUser);
