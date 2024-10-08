const express = require('express');
require('dotenv').config()
const sequelize = require('./config/db');
const { PORT } = require('./config');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json())
app.use(express.static('public'));
// Loop through route files and configure routes
const fs = require('fs');
const path = require('path');

// Sync all defined models to the database
sequelize.sync().then(() => {
  console.log('All models synced successfully.');
}).catch(err => {
  console.error('Error syncing models:', err);
});


const routesDir = path.join(__dirname, 'routes');

fs.readdirSync(routesDir).forEach(file => {
  const routePath = path.join(routesDir, file);
  const route = require(routePath);
  app.use(`/${file.replace('.js', '')}`, route);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
