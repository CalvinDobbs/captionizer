import imageToText from "./imageToText.js";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1gb" }));
app.use(express.static("/app/web/public"));

app.get("/", (req, res) => {
    res.sendFile("/app/web/app.html");
});

app.post("/run", async (req, res) => {
    try {
        const image = req.body.image;
        const prompt = req.body.prompt;
        const response = await imageToText(image, prompt);
        res.json({ output: response });
    } catch (err) {
        console.log(err.message);
        res.json({ error: true });
    }
});

export default app;
