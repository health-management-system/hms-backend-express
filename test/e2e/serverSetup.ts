import request from "supertest"
import { app } from "../../app"

export const appRequest= request(app)
