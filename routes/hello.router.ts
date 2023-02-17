import express, { Request, Response } from "express"

const helloRouter = express.Router()

helloRouter.get("/hello", (req:Request, res:Response)=>{
    res.json({hello: "hello"})
})

export default helloRouter;