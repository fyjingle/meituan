<template>
    <div class="shop" ref="shop">  
        <header>
            <svg class="icon" aria-hidden="true" @click="back">
                <use xlink:href="#icon-arrow-left"></use>
            </svg>
            <div class="search">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                </svg>
                <input type="text">
            </div>
            <svg class="icon more" aria-hidden="true">
                <use xlink:href="#icon-more"></use>
            </svg>
        </header>
        <div class="merchant">
            <div class="substitute"></div>
            <img class="background" :src="merchantInfo.poi_info.pic_url" alt="">
            <div class="left">
                <img :src="merchantInfo.poi_info.pic_url" alt="">
            </div>
            <div class="right">
                <div class="title">{{merchantInfo.poi_info.name}}</div>
                <div class="announcement">{{merchantInfo.poi_info.bulletin}}</div>
            </div>
            <div class="discount" v-if="merchantInfo.poi_info.discounts2.length">
                <img :src="merchantInfo.poi_info.discounts2[0].icon_url" alt="">
                <span class="discount-detail">{{merchantInfo.poi_info.discounts2[0].info}}</span>
                <span class="discount-num">{{merchantInfo.poi_info.discounts2.length}}个活动</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiantou-copy1"></use>
                </svg>
            </div>
        </div>
        <div class="tab">
            <div @click="toggle(1)"><span :class="{active:currentRouter == 'orderDishes'}">点菜</span></div>
            <div @click="toggle(2)"><span :class="{active:currentRouter == 'evaluation'}">评价</span></div>
            <div @click="toggle(3)"><span>商家</span></div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import merchantInfo from "../data/merchantInfo.json"
export default{
    name:"shop",
    data(){
        return {
            merchantInfo:"",
            currentRouter:"orderDishes"
        }
    },
    created(){
        this.merchantInfo = merchantInfo.data;
    },
    mounted(){
        this.$router.push({name:"orderDishes"});
    },
    methods:{
        back(){
            this.$router.push({path:"/main"});
        },
        toggle(index){
            switch(index){
                case 1:
                    if(this.currentRouter != 'orderDishes'){
                        this.$router.push({name:"orderDishes"});
                        this.currentRouter = "orderDishes";
                    }
                    break;
                case 2:
                    if(this.currentRouter != 'evaluation'){
                        this.$router.push({name:"evaluation"});
                        this.currentRouter = "evaluation";
                    }
                    break;    
                case 3:
                    break;
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.shop{
    width: 100%;
    height: calc( 100% + 2.9rem ) ;
    overflow: hidden;
    header{
        position: fixed;
        z-index: 2;
        width:100%;
        height: 1.133333rem;
        padding: .266667rem;
        font-size: .4rem;
        .icon{
            width: .733333rem;
            height: .733333rem;
            color: white;
        }
        .more{
            float: right;
        }
        .search{
            vertical-align: top;
            display: inline-block;
            width: 5.8rem;
            height: .84rem;
            margin-left: .61rem;
            border-radius: .4rem;
            background: white;
            .icon{
                width: 0.633333rem;
                height: 0.833333rem;
                color: gray;
                margin-left: 0.1rem;
            }
            input{
                width: 4.666667rem;
                margin-top: 0.1rem;
                vertical-align: top;
                height: 85%;
                outline: none;
                border: none;
            }
        }
        .icon-more{
            float: right;
            margin-right: .266667rem;
        }
    }
    .merchant{
        position: relative;
        overflow: hidden;
        z-index: 1;
        .substitute{
            height: 1.6rem;
        }
        .background{
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            transform: scale(1.9);
            filter: blur(12px) brightness(61.6%);
        }
        .left{
            width: 20.5%;
            margin-left:.266667rem;
            display: inline-block;
            img{
                width: 100%;
                border-radius: .133333rem;
            }
        }
        .right{
            width: calc( 100% - 20.5% - 1rem);
            display: inline-block;
            vertical-align: top;
            margin-left: .266667rem;
            .title{
                font-size: .44rem;
                color: white;
                font-weight: bold;
            }
            .announcement{
                margin-top: .266667rem;
                font-size: .35rem;
                color: rgba(255, 255, 255, 0.8);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .discount{
            margin-top: .213333rem;
            padding-left: .266667rem;
            img{
                width: .5rem;
                height: .5rem;
            }
            .discount-detail{
                display: inline-block;
                margin-left: .133333rem;
                width: 70%;
                color: white;
                font-size: .34rem;
                font-weight: lighter;
                vertical-align: top;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .discount-num{
                display: inline-block;
                margin-left: .233333rem;
                font-size: .34rem;
                font-weight: lighter;
                vertical-align: top;
                color: white;
            }
            .icon{
                width: 0.5rem;
                height: 0.5rem;
                color: white;
                vertical-align: top;
            }
        }
    }
    .tab{
        background: #fafafa;
        display: flex;
        position: relative;
        z-index: 1;
        div{
            text-align:center;
            flex:1;
            padding:.266667rem 0rem;
            font-size:.4rem;
            span{
                padding-bottom: 0.1rem;
                
            }
            .active{
                border-bottom: 1px solid #FFD161;
                font-weight: bold;
            }
        }
    }

}
</style>