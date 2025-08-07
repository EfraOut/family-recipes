const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., "Breakfast", "Lunch", "Dessert"
    required: true,
  },
  prepTime: {
    type: Number, // minutes
    required: true,
  },
  cookTime: {
    type: Number, // minutes
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
