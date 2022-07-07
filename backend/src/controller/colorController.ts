import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Color from "../model/Color"
import _ from 'lodash'
export const addColorCtrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { bodyColor } = req.body

    try {
      const color = await Color.create({
        name: _.upperFirst(bodyColor),
      })
      res.json(color)
    } catch (error: any) {
      res.json(error)
    }
  }
)
export const fetchColorsCtrl = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const colors = await Color.find({})
      res.json(colors)
    } catch (error) {
      res.json(error)
    }
  }
)
