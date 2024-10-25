const express = require('express');
const {
  Completed,
  PendingItems,
  cancelled,
} = require('../controller/aggrigateController');
const router = express.Router();

router.get('/completed', Completed);
router.get('/pending', PendingItems);
router.get('/cancel', cancelled);

module.exports = router;
