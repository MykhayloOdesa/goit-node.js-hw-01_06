require("dotenv").config();

const app = require("./app");

const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

const { DB_URI, PORT } = process.env;

(async () => {
  try {
    await mongoose.connect(DB_URI, {
      // dbName: `your database name`,
      // useNewUrlParser: true,
      // useNewParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // promiseLibrary: global.Promise,
      // useFindAndModify: false,
    });

    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
})();
