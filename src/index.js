import express from "express";
import "dotenv/config";
import {inngest, functions} from "./inngest/index.js";
import {serve} from "inngest/express";
import indexRoutes from "./routes/index.routes.js"

const app = express();


app.use(express.json());
app.use( "/api/inngest", serve({ client: inngest,functions,}));


app.get("/", (req, res) => {
    res.send("AutoWiki is running 🚀");
});

app.use("/api/index", indexRoutes);



app.listen(process.env.PORT, () => {
    console.log("Server is running on 4000}")
})
