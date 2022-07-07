"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchColorsCtrl = exports.addColorCtrl = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Color_1 = __importDefault(require("../model/Color"));
const lodash_1 = __importDefault(require("lodash"));
exports.addColorCtrl = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bodyColor } = req.body;
    try {
        const color = yield Color_1.default.create({
            name: lodash_1.default.upperFirst(bodyColor),
        });
        res.json(color);
    }
    catch (error) {
        res.json(error);
    }
}));
exports.fetchColorsCtrl = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield Color_1.default.find({});
        res.json(colors);
    }
    catch (error) {
        res.json(error);
    }
}));
