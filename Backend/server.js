const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const { restrictToLoggedinUserOnly } = require('./middleware/auth');
const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
require('dotenv').config();


const db = require('./connect'); 



const PORT = process.env.PORT || 3000;  


const app = express();
app.get('/server-time', (req, res) => {
    res.json({ serverTime: new Date().toISOString() });
});

console.log("Current server time:", new Date().toISOString());
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3001', // Client-side URL
    credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Use CORS with options
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Register routes
app.use("/user", userRoute);  
app.use("/task", taskRoute);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
