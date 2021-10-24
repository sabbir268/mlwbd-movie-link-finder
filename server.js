const express = require("express");
const app = express();
const cors = require("cors");
// enabling cors for all
app.use(cors());
// Enable pre-flight
app.options("*", cors());
const { finderNext } = require("./finderNext");
app.get("/:movie_name", (req, res) => {
    const { movie_name } = req.params;
    finderNext(movie_name).then((data) => {
        res.send(data);
    });
});

const port = Number(process.env.PORT || 3331);
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));