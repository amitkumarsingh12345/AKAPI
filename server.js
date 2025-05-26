const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const createRegistrationTable = require("./models/registrationModel");
const registrationRoutes = require("./routes/registration");

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/user", registrationRoutes);

// Create table if not exists
createRegistrationTable();

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
