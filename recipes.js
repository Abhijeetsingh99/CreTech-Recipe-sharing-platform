const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', (req, res) => {
    Recipe.getAll((err, recipes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(recipes);
    });
});

// Get a single recipe
router.get('/:id', (req, res) => {
    Recipe.getById(req.params.id, (err, recipe) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    });
});

// Create a new recipe
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.ingredients || !req.body.instructions) {
        return res.status(400).json({ message: 'Title, ingredients, and instructions are required' });
    }

    Recipe.create(req.body, (err, recipe) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(recipe);
    });
});

// Update a recipe
router.put('/:id', (req, res) => {
    Recipe.update(req.params.id, req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Recipe updated successfully' });
    });
});

// Delete a recipe
router.delete('/:id', (req, res) => {
    Recipe.delete(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Recipe deleted successfully' });
    });
});

// Search recipes
router.get('/search/:query', (req, res) => {
    Recipe.search(req.params.query, (err, recipes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(recipes);
    });
});

module.exports = router;