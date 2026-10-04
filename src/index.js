import express from "express";

const app = express();

const PORT =  4000;

app.use("/", (req, res) => {
    res.send("AutoWiki is running 🚀");
});



app.listen(PORT, () => {
    console.log("Server is running on 4000}")
})
