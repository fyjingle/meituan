import apiRequest from "../util/api_service"
import apiConfig from "../api/api_config"

class Position{
    constructor(){
        
    }
    async getUserPosition(req,res){
        /* let host = "wmapi.meituan.com";
        let path = "/api/v7/poi/homepage?request_id=C9EF25D3-74E2-4BE6-AE02-0ED441DD1518&utm_term=5.10.1&utm_source=2000&platform=5&wm_actual_longitude=113875320&waimai_sign=Y9XPnU3Q8T7sK9APcBwKdCPTNp50SYX9QeTIqGVxDPVWX833ezIeTC1YM0IhdxwtAqR1a5nolv%2Fe0y4mgyZ0epDNLtifYwtFv2JUQVbtzZj663cHXXHo3dLam%2FkEwqQubTQ4Jvv%2B%2Ft%2BirDpYvZndj62oJWkzDcqBuz%2FNIlQQ9hc%3D&partner=4&version=5.10.1&req_time=1510130902156&uuid=74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8&wm_dversion=10.3.1&wm_actual_latitude=22907602&seq_id=11138&wm_visitid=27FAC389-2ECC-4877-AA9C-50C46AA188FD2017-11-08-16-48757&wm_seq=9&app=4&__skno=2943FA46-9700-48E3-A5EB-B9B0D777160B&wm_appversion=5.10.1&wm_ctype=iphone&__skcy=TPWlC9Iy2LadbPwAMAAGPdzm1Yw%3D&utm_medium=iphone&wm_logintoken=0GDhwTSz9XenbWXt0P4oMtmCb5gAAAAAKAQAAA1vAVhbgSV4S8jcTa3dM8zfpVNHCbCmaJr3knk3JSpSxNMLAoly9QdDEhm_V95jxw&__skua=2eea7f401d5e00e6bad1957d305ebad1&wm_dtype=iPhone%206&wm_did=1475B1EF-2F8B-4648-A649-F6FCDD68EE94&wm_channel=2000&ci=0&__skck=3c0cf64e4b039997339ed8fec4cddf05&wm_uuid=74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8&wm_longitude=113875320&movieBundleVersion=100&utm_content=74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8&wm_latitude=22907602&utm_campaign=AwaimaiBwaimaiGhomepageH0&__skts=1510130903.155706&userid=265940599";
        let data = await apiRequest(host,path,"POST"); */

        let IPREG = /([0-9]+\.*)+/;
        let url = apiConfig.API_ROUTER_CONFIG.userposition 
                + "?ip="
                +"113.105.128.255"
                /* + req.ip.match(IPREG)[0] */
                + "&key="
                + apiConfig.KEY_CONFIG.secret;
    
        let data = await apiRequest(
            apiConfig.HOST_CONFIG.host,
            url,
            "GET"
        );
        data = await this.conversionCoordinates(data);
        data = JSON.parse(data);
        res.send(data.result.address_component);

    }
    async conversionCoordinates(data){
        data = JSON.parse(data);
        let url = apiConfig.API_ROUTER_CONFIG.conversionCoordinate
                    +"?location="
                    +data.result.location.lat
                    +","
                    +data.result.location.lng
                    +"&key="
                    +apiConfig.KEY_CONFIG.secret;
        
        let result = await apiRequest(
            apiConfig.HOST_CONFIG.host,
            url,
            "GET"
        );
        return result;
    }
}

module.exports = Position;