const Sale = require('../model/aggrigate');

const GetAll = async (req, res) => {
  try {
    const data = await Sale.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Data Note Found' });
  }
};
const GetById = async (req, res) => {
  try {
    // const id = parseInt(req.params.id);
    const data = await Sale.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Item Not Found' });
  }
};
const DeleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await Sale.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: 'Item Not Found' });
    }

    res
      .status(200)
      .json({ message: 'Item deleted successfully', data: deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

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

module.exports = {
  GetAll,
  GetById,
  DeleteById,
  Completed,
  PendingItems,
  cancelled,
};
