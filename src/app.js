const express = require("express")
const dotenv = require('dotenv')
const userRouter = require("./routes/users")
const booksRouter = require("./routes/books")
const bodyParser = require("body-parser")
const originalUrl = require("./middlewares/originalUrl")
const cors = require("cors");
const mongoose = require("mongoose")

dotenv.config()
const app = express();

const {
    PORT = 3005,
    API_URL = 'http://127.0.0.1',
    MONGO_URL = "mongodb://localhost:27017/mongo-container"
} = process.env;
    

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.error("Error connecting to MongoDB", error);
    })

app.use(bodyParser.json())
app.use("/users", userRouter);
app.use("/books", booksRouter)
app.use(cors());
app.use(originalUrl);

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
})
