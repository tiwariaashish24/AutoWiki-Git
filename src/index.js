import express from "express";
import "dotenv/config";
import {inngest, functions} from "./inngest/index.js";
import {serve} from "inngest/express";

const app = express();
// const PORT =  4000;

app.use(express.json());
app.use( "/api/inngest", serve({ client: inngest,functions,}));


app.use("/", (req, res) => {
    res.send("AutoWiki is running 🚀");
});



app.listen(process.env.PORT, () => {
    console.log("Server is running on 4000}")
})
