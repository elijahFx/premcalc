require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

app.use(function(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
     next();
 });

const corsOptions = {
    origin: ["https://premcalc.netlify.app", "http://127.0.0.1:5173", "http://127.0.0.1:5173/", "http://localhost:5173", "http://localhost:5173/forgot-password", "http://localhost:5173/sessions", "https://premcalc.netlify.app/sessions", "https://premcalc.netlify.app/forgot-password"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}

app.use(cors())

app.use(express.json())

const casesRoutes = require("./routes/cases")
const usersRoutes = require("./routes/users") 
const suitesRoutes = require("./routes/suites")
const sessionRoutes = require("./routes/sessions")
const consumerRoutes = require("./routes/consumers")

app.use("/cases", casesRoutes)
app.use("/users", usersRoutes)
app.use("/suites", suitesRoutes)
app.use("/sessions", sessionRoutes)
app.use("/consumers", consumerRoutes)



mongoose.connect(process.env.URI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`Сервер включился и работает на порте ${process.env.PORT}`);
        })


    })
    .catch((error) => {
        console.log(error);
    })