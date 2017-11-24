import {
    CARINIT,
    ADD,
    REDUCE,
    EMPTYCAR
}from "../mutations-type"

const state = {
    sellerID:{},    //保存该商家在foodID和totalPrice中的下标
    foodID:[],      //保存每一个商店的食物以及食物对应的价格
    foodCount:[],   //保存用户点的每一个食物的数量
    totalPrice:[]   //保存用户在每一个商家中的商品总价
}

const mutations = {
    [CARINIT](state,id){
        if(!state.sellerID[id]){
            state.sellerID[id] = state.foodID.length;
            state.foodID[state.foodID.length] = new Object();
            state.totalPrice[state.totalPrice.length] = 0;
        }
    },
    [ADD](state,food){
        let sellerIndex = state.sellerID[food.seller];
        if(!state.foodID[sellerIndex][food.id]){
            state.foodID[sellerIndex][food.id] = new Object();
            let temp = {
                price:food.price,
                name:food.name,
                id:food.id
            }
            food.self.$set(state.foodID[sellerIndex],food.id,temp);
            state.foodID[sellerIndex][food.id].index = state.foodCount.length;
            food.self.$set(state.foodCount,state.foodCount.length,1);
        }else{
            let countIndex = state.foodID[sellerIndex][food.id].index;
            food.self.$set(state.foodCount,countIndex,state.foodCount[countIndex]+1);
        }
        food.self.$set(state.totalPrice,sellerIndex,state.totalPrice[sellerIndex] + food.price);
    },
    [REDUCE](state,food){
        let sellerIndex = state.sellerID[food.seller];
        let countIndex = state.foodID[sellerIndex][food.id].index;
        if(state.foodCount[countIndex] > 0){
            food.self.$set(state.foodCount,countIndex,state.foodCount[countIndex]-1);
            food.self.$set(state.totalPrice,sellerIndex,state.totalPrice[sellerIndex] - food.price);
        }
    },
    [EMPTYCAR](state,data){
        let seller = data.seller;
        seller = state.sellerID[seller];
        let food = state.foodID[seller];
        for( var i in food ){
            let index = food[i].index;
            if(state.foodCount[index]){
                data.self.$set(state.foodCount,index,0);
            }
        }
        data.self.$set(state.totalPrice,seller,0);
    }
}

export default {
    state,
    mutations
}