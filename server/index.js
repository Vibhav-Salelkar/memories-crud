import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(cors());

app.use('/posts', postRoutes);
app.get('/', (req,res) => {
    res.send('Hello to Memories api')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log("server running on port: ", PORT)))
    .catch((error) => console.log(error.message) )

mongoose.set('useFindAndModify', false);