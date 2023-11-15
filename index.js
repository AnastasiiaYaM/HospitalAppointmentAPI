const env = require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./src/models');
const usersRouter = require("./src/routes/userRoutes");
const doctorsRouter = require("./src/routes/doctorsRoutes");
const patientsRouter = require("./src/routes/patientsRoutes");
const adminsRouter = require("./src/routes/adminsRoutes");
const specialtiesRouter = require("./src/routes/specialtiesRoutes");
const diseasesRouter = require("./src/routes/diseasesRoutes");
const appointmentsRouter = require("./src/routes/appointmentsRoutes");
const reviewsRouter = require("./src/routes/reviewsRoutes");
const conflictsRouter = require("./src/routes/conflictsRoutes");
const authRoutes = require("./src/routes/authRoutes");

const cookieParser = require("cookie-parser");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1', [
  (req, res, next) => {
      res.send('This is the home page!')
  }
]);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/admins", adminsRouter);
app.use("/api/v1/specialties", specialtiesRouter);
app.use("/api/v1/diseases", diseasesRouter);
app.use("/api/v1/appointments", appointmentsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/conflicts", conflictsRouter);
app.use("/api/v1/",authRoutes);

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
});

db.sequelize.sync();


const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server ts listening to 3000.'));
