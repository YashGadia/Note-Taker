const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true
  };

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
dotenv.config();
app.use(cors(corsOptions));
connectDB();
app.use(express.json());



app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);