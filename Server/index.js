const express = require("express")

const authRoutes = require('./src/routes/authRoutes')
const taskRoutes = require('./src/routes/taskRoutes')


const connectDB = require("./src/config/db")
const cors = require('cors')

require('dotenv').config()


const app = express()
app.use(cors({
    origin: "*", // Allow all domains (for testing only)
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json())
app.use(`/auth`, authRoutes);
app.use(`/task`, taskRoutes);

connectDB()

PORT = process.env.PORT
app.listen(PORT,()=>console.log((`Listening at ${PORT}`))
)