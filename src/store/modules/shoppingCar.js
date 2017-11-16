import {
    CARINIT,
    ADD,
    REDUCE
}from "../mutations-type"

const state = {
    sellerID:{},
    foodID:[],
    foodCount:[]
}

const mutations = {
    [CARINIT](state,id){
        if(!state.sellerID[id]){
            state.sellerID[id] = state.foodID.length;
            state.foodID[state.foodID.length] = new Object();
        }
    },
    [ADD](state,id,food){
        let sellerIndex = state.sellerID[id];
        if(!state.foodID[sellerIndex][food.id]){
            state.foodID[sellerIndex][food.id] = new Object();
            state.foodID[sellerIndex][food.id][index][price] = food.price;
            state.foodID[sellerIndex][food.id][index] = state.foodCount.length;
            state.foodCount[state.foodCount.length] = 1;
        }else{
            let countIndex = state.foodID[sellerIndex][food.id];
            state.foodCount[countIndex]++;
        }
    },
    [REDUCE](state,id,food){
        let sellerIndex = state.sellerID[id];
        let countIndex = state.foodID[sellerIndex][food.id];
        if(state.foodCount[countIndex] > 0)
            state.foodCount[countIndex]--;
    }
}

export default {
    state,
    mutations
}