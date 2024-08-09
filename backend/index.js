import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
    path:".env"
})

//create server
databaseConnection(); // connect to database
const app = express(); 

// middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:"",
    methods:["POST","GET"],
    credentials:true
}
// app.use(cors(corsOptions));// to tell that we are using this origin to send htttp request
app.use(cors());
// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet", tweetRoute);
 

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})