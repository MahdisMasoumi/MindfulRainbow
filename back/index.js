const express = require("express");
const app = express();
const config = require("./config");
const cors = require("cors");
const moodTrackingRoutes = require("./routes/moodTracking_routes");
const rainbowGoalsRoutes = require("./routes/rainbowGoals_routes");
const rainbowRaysRoutes = require("./routes/rainbowRays_routes");
const userRoutes = require("./routes/user_routes");
const therapyTrackerRoutes = require("./routes/therapyTracker_routes");
const authRoutes = require("./routes/auth_routes");
config
  .authenticate()
  .then(function () {
    //fulfiled
    console.log("database is connected");
  })
  .catch(function () {
    //rejected
    console.log("there is no connection");
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

//register routes
app.use("/mood-tracking", moodTrackingRoutes);
app.use("/rainbow-goals", rainbowGoalsRoutes);
app.use("/rainbow-rays", rainbowRaysRoutes);
app.use("/therapy-tracker", therapyTrackerRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(3000, function () {
  console.log("server is running at port 3000 ......");
});
