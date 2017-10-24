import express from "express"
import apiRequest from "../util/api_service"
import apiConfig from "../api/api_config"
const router = express.Router();

router.get("/",(req,res)=>{
    let IPREG = /([0-9]+\.*)+/;
    let url = apiConfig.API_ROUTER_CONFIG.userposition 
            + "?ip="
            +"113.105.128.255"
            /* + req.ip.match(IPREG)[0] */
            + "&key="
            + apiConfig.KEY_CONFIG.secret;

    apiRequest(
        apiConfig.HOST_CONFIG.host,
        url,
        "GET",
        null,
        (data)=>{
            res.send(data);
        },
        (error)=>{
            res.send(error);
        })
});

export default router;