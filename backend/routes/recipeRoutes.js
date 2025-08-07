const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// CREATE Recipe
router.post('/', async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ All Recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ Single Recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE Recipe (Partial or Full)
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
