require("dotenv").config({ path: './.env' })
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const downloadhRouter = require("./routes/download")
const fileRouter = require("./routes/files");
const urlRouter = require("./routes/url");
const slugRouter = require("./routes/slug");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB();

app.use(express.json())
app.use(cors())

app.use("/api/files", fileRouter);
app.use("/files", downloadhRouter);
app.use("/api/url", urlRouter)
app.use("/", slugRouter)

const PORT = process.env.PORT || 3300

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })