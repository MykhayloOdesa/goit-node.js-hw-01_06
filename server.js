require("dotenv").config();
const app = require("./app");

const mongoose = require("mongoose");

const { DB_URI, PORT = 3000 } = process.env;

(async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
