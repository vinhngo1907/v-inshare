require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

const downloadhRouter = require("./routes/download")
const fileRouter = require("./routes/files")
const connectDB = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
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

const PORT = process.env.PORT || 3300

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })