import "dotenv/config"
import cors from "cors"
import express, { json } from "express"


import { routes } from "./routes"
import { setupMongo } from "./database"
import { errorHandler } from "./middleware/error.handler"

setupMongo().then(() => {
    const app = express()

    app.use(cors({
        origin: process.env.FRONT_URL,
    }));

    app.use(json())
    app.use(routes)
    app.use(errorHandler)

    app.listen(3335, () => {
        console.log(`🚀 Server online port 3335`)
    })

})

