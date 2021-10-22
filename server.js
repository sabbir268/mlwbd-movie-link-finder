const express = require("express");
const app = express();
const { finder } = require("./finder");
app.get("/", (req, res) => {
    finder().then((data) => {
        res.send(data);
    });
});

const port = Number(process.env.PORT || 3331);
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));