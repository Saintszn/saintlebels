require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // Serve the front-end files

// Use payment routes
app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
