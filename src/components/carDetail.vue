<template>
<div class="carDetail">
    <div class="content">
        <header @click="emptyCar">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-trash"></use>
            </svg>
            清空购物车
        </header>
        <ul>
            <li v-for="(item,index) in foodID[foodIndex]" v-if="foodCount[foodID[sellerID[seller]][item.id].index]">
                <span class="name">{{item.name}}</span>
                <span class="price">{{item.price}}</span>
                <div class="block"></div><!-- 由于addToCar绝对定位，用该div撑开它的位置 -->
                <addToCar
                    class="addToCar"
                    :seller="seller"
                    :food="item"
                    :car="false"
                    :add="true"
                    :name="item.name"
                ></addToCar>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
    import addToCar from "./addToCar.vue"
    import { mapGetters } from 'vuex'
    import { EMPTYCAR } from "../store/mutations-type"
    export default{
        name:"carDetail",
        props:['seller'],
        data(){
            return {
                foodIndex:"",
            }
        },
        computed:{
            ...mapGetters({
                sellerID:'sellerID',
                foodID:"foodID",
                foodCount:"foodCount",
            })
        },
        components:{
            addToCar
        },
        created(){
            this.foodIndex = this.sellerID[this.seller];
        },
        methods:{
            emptyCar(){
                this.$store.commit(EMPTYCAR,{seller:this.seller,self:this});
            }
        }
    }
</script>
<style lang="scss" scoped>
.carDetail{
    position: absolute;
    z-index: 1;
    top: 0;
    display: flex;
    width: 100%;
    height: calc( 100% - 1.3333333rem );
    overflow:scroll;
    background: rgba(0, 0, 0, 0.6);
    .content{
        position: absolute;
        bottom:0;
        width:100%;
        max-height: 10rem;
        background:#f5f5f5;
        header{
            text-align: right;
            padding-right: 0.414rem;
            padding-top:0.264rem;
            padding-bottom: 0.264rem;
            font-size: 0.34rem;
            background: #efefef;
        }
        ul{
            li{
                position: relative;
                display:flex;
                border-bottom: 1px solid #e3e3e3;
                padding:.4rem .3rem;
                font-size: 0.4rem;
                .name{
                    flex:5;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                .price{
                    flex:1;
                    text-align:center;
                }
                .block{
                    flex: 2;

                }
                .addToCar{
                    position: absolute;
                    top: 0.3rem;
                    right: 0.33rem;
                }
            }
        }
    }
}
</style>