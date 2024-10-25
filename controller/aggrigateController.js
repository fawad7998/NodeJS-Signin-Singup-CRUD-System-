const Sale = require('../model/aggrigate');

const Completed = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      { $match: { status: 'completed' } },

      {
        $group: {
          _id: '$category',
          totalSales: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },

      { $sort: { totalSales: -1 } },

      {
        $project: {
          _id: 0,
          category: '$_id',
          totalSales: 1,
          count: 1,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const PendingItems = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $match: { status: 'pending' },
      },
      {
        $group: {
          _id: '$category',
          totalSales: { $sum: '$amount' },
        },
      },
      {
        $sort: { totalSales: 1 },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalSales: 1,
          count: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const cancelled = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $match: { status: 'cancelled' },
      },
      {
        $group: {
          _id: '$category',
          totalSales: { $sum: '$amount' },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalSales: 1,
          count: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { Completed, PendingItems, cancelled };
