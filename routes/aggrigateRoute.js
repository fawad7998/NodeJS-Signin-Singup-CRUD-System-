const express = require('express');
const {
  GetAll,
  GetById,
  Completed,
  PendingItems,
  cancelled,
  DeleteById,
} = require('../controller/aggrigateController');
const router = express.Router();

router.get('/getall', GetAll);
router.get('/getId/:id', GetById);
router.get('/delId/:id', DeleteById);
router.get('/completed', Completed);
router.get('/pending', PendingItems);
router.get('/cancel', cancelled);

module.exports = router;
