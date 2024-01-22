const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const path = require('path');
const app = express();
const inventoryRoutes = require('./routes/inventory');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', inventoryRoutes); 
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://varun:Accenture1@cluster0.6p3xn8l.mongodb.net/Varun', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
