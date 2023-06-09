require('dotenv').config();

const app = require('./app');

const mongoose = require('mongoose');

const { DB_URI, PORT } = process.env;

(async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
})();
