const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');


app.use(cors());

require("dotenv").config;

const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// connecting with database mongodb
require("./config/database").connect();

// import route
const leads = require("./route/leads");
app.use("/api/v1",leads);

const property = require("./route/property");
app.use("/api/v1/", property);

const document = require("./route/documents");
app.use("/api/v1/", document);

app.get("/", (req,res) => {
    res.send("Hello World");
});

// const Port = 3000;

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});
