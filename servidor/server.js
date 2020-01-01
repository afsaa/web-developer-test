const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const api = require("./routes/api");
const port = process.env.PORT || 8080;

// Bodyparser
app.use(bodyParser.json());

// API endpoints (routes)
app.use(api);

// Starting the server
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});
