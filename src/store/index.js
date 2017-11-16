import Vue from "vue"
import Vuex from "vuex"
import shoppingCar from "./modules/shoppingCar"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        shoppingCar,
    }
})