const express = require('express');
const Item = require('../models/item.js');

const ItemRouter = express.Router();
ItemRouter.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({
      message: err
    });
  }
});
ItemRouter.post('/', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  });
  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

ItemRouter.put('/:id', async (req, res) => {
  console.log(req.body);

  Item.findByIdAndUpdate(req.params.id, {
    $set: {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
    }

  }, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.send({
      success: true,
      changed: item
    });
  });
});

ItemRouter.delete('/:id', async (req, res) => {
  console.log(req.params.id);
  Item.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
  });
  const items = await Item.find();
  res.json(items);
});


module.exports = ItemRouter;
