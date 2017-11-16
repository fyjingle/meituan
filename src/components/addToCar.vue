<template>
    <div class="addToCar">
        <svg class="icon" aria-hidden="true" @click="addToCar($event)" v-if="showAdd">
            <use xlink:href="#icon-up"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="reduce" v-if="showReduce">
            <use xlink:href="#icon-jian"></use>
        </svg>
        <span @click="addToCar($event)" v-if="showCar">
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
export default{
    name:"addToCar",
    props:["seller","food","car","add","hasChoose"],
    data(){
        return {
            showAdd:"",
            showReduce:"",
            showCar:""
        }
    },
    mounted(){
        this.initButton();
    },
    methods:{
        initButton(){
            this.showAdd = this.add;
            this.showReduce = this.hasChoose;
            this.showCar = this.car;
        },
        addToCar(event){
            this.$emit("ball",event.target.getBoundingClientRect());
            this.$emit("middleStation",event.target.getBoundingClientRect());

            this.$store.commit(ADD,this.seller,this.food);

        },
        reduce(){
            this.$store.commit(REDUCE,this.seller,this.food);
        }
    }
}
</script>
<style lang="scss" scoped>
.addToCar{
    .icon{
        /* position: absolute;  
        right: 0;
        top: -.266667rem; */
        width: 0.8rem;
        height: 0.8rem;
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