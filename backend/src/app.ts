import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express"
import { Server } from "http"
import createHttpError from "http-errors"
import { config } from "dotenv"
import mongoose from "mongoose"
import { addColorCtrl, fetchColorsCtrl } from "./controller/colorController"
const app: Application = express()
config()
//mongoose connection
mongoose.connect(`${process.env.MONGO_URL}`, () => {
  console.log("Connected to database")
})
//port

const PORT: Number = Number(process.env.PORT) || 5000
//use json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//routes
app.get("/", fetchColorsCtrl)
app.post("/", addColorCtrl)
//err handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
}

//server
const server: Server = app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`)
})
