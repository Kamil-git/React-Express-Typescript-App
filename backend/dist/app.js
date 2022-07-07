"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const colorController_1 = require("./controller/colorController");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
//mongoose connection
mongoose_1.default.connect(`${process.env.MONGO_URL}`, () => {
    console.log("Connected to database");
});
//port
const PORT = Number(process.env.PORT) || 5000;
//use json
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.get("/", colorController_1.fetchColorsCtrl);
app.post("/", colorController_1.addColorCtrl);
//err handler
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
//server
const server = app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`);
});
