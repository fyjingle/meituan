import Vue from "vue"
import Vuex from "vuex"
import shoppingCar from "./modules/shoppingCar"
import * as getters from "./getters"

Vue.use(Vuex);

export default new Vuex.Store({
    getters:getters,
    modules:{
        shoppingCar,
    }
})