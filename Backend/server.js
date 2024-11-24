const express = require("express");
const { connectDB ,sequelize} = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes"); 
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


sequelize.sync({ force: false }) // `force: false` prevents overwriting existing data
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });



app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/*",async(req,res)=>{
    res.send("Working !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
