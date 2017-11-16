import express from "express"
const router = express.Router();
import Position from "../module/position"

router.get("/",(req,res)=>{
    new Position().getUserPosition(req,res);
});

export default router;