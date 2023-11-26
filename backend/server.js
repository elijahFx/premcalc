require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const corsOptions = {
    origin: "http://localhost:4000" // frontend URI (ReactJS)
}

app.use(cors(corsOptions))

app.use(express.json())

const casesRoutes = require("./routes/cases")

app.use("/cases", casesRoutes)


mongoose.connect(process.env.URI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`Сервер включился и работает на порте ${process.env.PORT}`);
        })


    })
    .catch((error) => {
        console.log(error);
    })

