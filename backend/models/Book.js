const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: String,
    publishedYear: Number,
    availableCopies: Number
});

module.exports = mongoose.model('Book', bookSchema);