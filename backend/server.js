const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// This defines the URL as http://localhost:5000/api/books
app.use('/api/books', bookRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

app.get('/', (req, res) => res.send("Server Running"));

app.listen(5000, () => console.log("🚀 Server on port 5000"));