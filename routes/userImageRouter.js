import express from "express";
import { getItems, createItem } from "../controllers/items.js";
const userImageRouter = express.Router();


userImageRouter.get("/", getItems);

userImageRouter.post("/", createItem);


export default userImageRouter;
