const host_config = {
    host:'http://apis.map.qq.com'
}

const api_router_config = {
    userposition:"/ws/location/v1/ip",
    conversionCoordinate:"/ws/geocoder/v1",
    shopList:"../data/shopList.json"
}

const key_config = {
    secret: 'IH6BZ-FACKR-6RUWV-WJ6EQ-ZWRES-LGB77',
}

const apiConfig = {
    HOST_CONFIG : host_config,
    API_ROUTER_CONFIG : api_router_config,
    KEY_CONFIG : key_config
}

module.exports = apiConfig;