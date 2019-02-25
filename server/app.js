const mongoose = require("mongoose"),
    express = require("express"),
    routes = require("./routes/"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    router = express.Router(),
    helmet = require("helmet"),
    url = "mongodb://localhost:27017/spike-exercise-demo";

mongoose.connect(url, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log("Unable to connect to db");
    }
    console.log("Connected to: %s", url);
});

let port = 8080;

routes(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
