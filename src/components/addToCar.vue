<template>
    <div class="addToCar">
        <div class="count" v-show="count > 0">{{count}}</div>
        <svg class="icon" aria-hidden="true" @click="addToCar($event)" v-if="!showCar">
            <use xlink:href="#icon-up"></use>
        </svg>
        <transition name="reduce">
            <svg class="icon reduce" aria-hidden="true" @click="reduce" v-if="count">
                <use xlink:href="#icon-jian"></use>
            </svg>
        </transition>
        <span @click="hideCar($event)" v-if="showCar">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gouwuche-copy"></use>
            </svg>
            加入购物车
        </span>
    </div>
</template>
<script>
import {
    ADD,
    REDUCE
}from "../store/mutations-type.js"
import { mapGetters } from 'vuex'
export default{
    name:"addToCar",
    props:["seller","food","car","add",'name'],
    data(){
        return {
            showCar:"",
            
        }
    },
    computed:{
        ...mapGetters({
            sellerID:'sellerID',
            foodID:"foodID",
            foodCount:"foodCount",
        }),
        count(){
            this.food.seller = this.seller;
            let seller = this.sellerID[this.seller];
            let index = -1;
            if(this.foodID[seller][this.food.id]){
                index = this.foodID[seller][this.food.id].index;
            }
            return this.foodCount[index];
        }
    },  
    mounted(){
        this.initButton();
        /* this.food.seller = this.seller;
        let seller = this.sellerID[this.seller];
        if(this.foodID[seller][this.food.id]){
            let index = this.foodID[seller][this.food.id].index;
            this.count = this.foodCount[index];
            this.showReduce = this.foodCount[index] > 0 ;
        } */
    },
    methods:{
        initButton(){
            this.showCar = this.car;
        },
        addToCar(event){
            this.$emit("ball",event.target.getBoundingClientRect());
            this.$emit("middleStation",event.target.getBoundingClientRect());
            this.food.self = this;
            this.food.name = this.name;
            this.$store.commit(ADD,this.food);
            if(this.showCar)
                this.showCar = false;
            //this.count++;
            /* this.showReduce = true; */
        },
        reduce(){
            this.food.seller = this.seller;
            this.food.self = this;
            this.$store.commit(REDUCE,this.food);
            //this.count--;
            /* if(this.count == 0)
                this.showReduce = false; */
        },
        hideCar(event){
            this.addToCar(event);
            this.showCar = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.addToCar{
    position: relative;
    .count{
        color: black;
        font-weight: lighter;
        display: inline-block;
        vertical-align: top;
        padding-right: 0.1rem;
        padding-top: 0.1rem;
    }
    .icon{
        width: 0.7rem;
        height: 0.7rem;
    }
    .reduce{
        position: absolute;
        top: 0;
        width:0.8rem;
        height:0.8rem;
        left:-1rem;
    }
    .reduce-enter-active,.reduce-leave-active{
        transition:opacity .2s linear,left .5s linear,transform .5s linear;
        transform:rotate(-540deg);
        left: -1.5rem;
    }
    .reduce-enter,.reduce-leave-to{
        opacity: 0;
        transform: rotate(0);
        left: 0;
    }
    span{
        background: #fed15e;
        padding: 0.1rem 0.3rem;
        font-size: 0.44rem;
        border-radius: 0.4rem;
        .icon{
            width: 0.5rem;
            height:0.5rem;
        }
    }
}

</style>