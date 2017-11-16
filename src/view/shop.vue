<template>
    <div class="shop" ref="shop">  
        <header>
            <svg class="icon" aria-hidden="true">
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
            <div @click="toggle">点菜</div>
            <div @click="toggle">评价</div>
            <div @click="toggle">商家</div>
        </div>
        <div class="shelves" :class="{stopScroll:stopScroll}">
            <div class="species" ref="species" >
                <div class="content">
                    <ul>
                        <li v-for="item in merchantInfo.food_spu_tags">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="food" ref="food">
                <div class="content">
                    <ul v-for="(item,index) in merchantInfo.food_spu_tags">
                        <li v-for="(food,foodIndex) in item.spus">
                            <img :src="food.picture" alt="">
                            <div class="content">
                                <div class="name">{{food.name}}</div>
                                <div class="description">{{food.description}}</div>
                                <span>{{food.month_saled_content}}</span>
                                <span>{{food.praise_content}}</span>
                                <div class="price">
                                    ￥{{food.min_price}}
                                    <span class="specification" v-if="food.skus.length > 1" @click="showSpecificationShow(food)">
                                        选规格
                                    </span>
                                    <addToCar 
                                        v-if="food.skus.length == 1" 
                                        @ball="ball" 
                                        :seller="merchantInfo.poi_info.id"
                                        :food="food.skus[0]"
                                        :car="false"
                                        :add="true"
                                        :hasChoose="false"
                                    ></addToCar>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <specification 
            :title="merchantInfo.food_spu_tags[5].spus[2].name" 
            :skus="merchantInfo.food_spu_tags[5].spus[2].skus"  
            :food="specificationContent"
            @ball="ball" 
            @close="closeSpecification"
            v-if="specificationShow">
        </specification>
        <div class="shoppingCart">
            <div class="car">
                <div class="carWrap" :class="{carActive:carTransitionOpen}" ref='carWrap'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gouwuche"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" v-show="false">
                        <use xlink:href="#icon-gouwuche-copy"></use>
                    </svg>                
                </div>
            </div>
            <div class="totalAmount">
                <div class="foodPrice">￥11</div>
                <div class="tip">{{merchantInfo.shopping_cart.shipping_fee_cart_tip}}</div>
            </div>
            <span class="shippingFee" v-if='false'>
                {{merchantInfo.shopping_cart.shipping_fee_cart_tip}}
            </span>
            <span class="buy">￥{{merchantInfo.poi_info.min_price}}起送</span>
        </div>
        <div class="ball"
                v-show="showBall"
                ref="ball" 
                :style="{bottom:ballY+'px',left:ballX+'px',transform:'translateX(calc( ' + constX +'rem + ' + ballTX +'px ))'}">
                <div class="y"
                    :style="{transform:'translateY(calc( ' + constY +'rem + ' + ballTY +'px ))'}">
                </div>
        </div>
    </div>
</template>
<script>
import merchantInfo from "../data/merchantInfo.json"
import bScroll from "better-scroll"
import { mapGetters } from 'vuex'
import specification from "../components/specification.vue"
import addToCar from "../components/addToCar.vue"
export default{
    name:"shop",
    data(){
        return {
            merchantInfo:"",
            stopScroll:true,
            showBall:false,
            //小球动画位置计算
            constX:"",
            constY:"",
            ballX:"",
            ballY:"",
            ballTX:"",
            ballTY:"",
            //购物车动画开启标志
            carTransitionOpen:false,
            //规格显示
            specificationShow:false, 
            //规格内容
            specificationContent:""

            
        }
    },
    computed:{
        ...mapGetters({
            sellerID:'sellerID',
            foodID:"foodID",
            foodCount:"foodCount"
        }),
        totalPrice(){
            let sellerIndex = sellerID[merchantInfo.poi_info.id];
            
        }
    },
    components:{
        specification,
        addToCar
    },
    created(){
        this.merchantInfo = merchantInfo.data;
        console.log(this.merchantInfo);
    },
    mounted(){
        this.$nextTick(()=>{
            this.speciesScroll = new bScroll(this.$refs.species,{
                click:true
            });
            this.foodScroll = new bScroll(this.$refs.food,{
                click:true
            });
        });
        this.bindListener();
        
    },
    methods:{
        toggle(){

        },
        /* addToCar(event){
            this.showBall = true;
            this.$nextTick(()=>{
                 //计算小球动画终点位置
                this.constX = 0.9;
                this.constY = -1.4;
                var rect = event.target.getBoundingClientRect();
                this.ballX = rect.x + rect.width/2;
                var clientY = document.body.clientHeight;
                this.ballY = (clientY - rect.y - rect.height/2);
                this.ballTX = -this.ballX;
                this.ballTY = this.ballY;
            });
        }, */
        ball(rect){
            this.showBall = true;
            this.$nextTick(()=>{
                //计算小球动画终点位置
                this.constX = 0.9;
                this.constY = -1.4;
                this.ballX = rect.x + rect.width/2;
                var clientY = document.body.clientHeight;
                this.ballY = (clientY - rect.y - rect.height/2);
                this.ballTX = -this.ballX;
                this.ballTY = this.ballY;
            });
        },
        ballTransition(){
            this.carTransitionOpen = true;
            this.showBall = false;
            this.ballX = this.ballTX = this.ballY = this.ballTY = this.constX = this.constY = "0";
            
        },
        carTransition(){
            this.carTransitionOpen = false;
        },
        bindListener(){
            this.$refs.ball.addEventListener("webkitTransitionEnd",this.ballTransition,false);
            this.$refs.ball.addEventListener("transitionend",this.ballTransition,false);
            this.$refs.carWrap.addEventListener("webkitAnimationEnd",this.carTransition,false);
            this.$refs.carWrap.addEventListener("animationEnd",this.carTransition,false);
        },
        showSpecificationShow(food){
            this.specificationShow = true;
            this.specificationContent = food;

        },
        closeSpecification(){
            this.specificationShow = false;
        }
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
        }
    }
    .shelves{
        display: flex;
        height: calc( 100% - 6.37333rem );
        .species{
            background: #f3f3f3;
            flex: 1;
            ul{
                li{
                    padding:.32rem .266667rem .32rem .213333rem;
                    font-size: .36rem;
                    border-bottom: .026667rem solid #e4e4e4;
                }
                .active{
                    background: white;
                }
            }
        }
        .food{
            flex: 3.7;
            min-width:0;
            height: 100%;
            ul{
                li{
                    padding-top: .266667rem;
                    padding-left: .266667rem;
                    padding-bottom: .266667rem;
                    img{
                        width: 2rem;
                        height: 2rem;           
                    }
                    .content{
                        width: calc( 100% - 2.5rem );
                        margin-left: .213333rem;
                        display: inline-block;
                        vertical-align: top;
                        .name{
                            width:90%;
                            font-size: .4rem;
                            font-weight: bolder;
                        }
                        .description{
                            margin-top: .133333rem;
                            max-width: 90%;
                            font-size: .2rem;
                            color: gray;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        span{
                            display: inline-block;
                            margin-top: .133333rem;
                            font-size: .2rem;
                            color: gray;
                        }
                        .price{
                            position: relative;
                            color: red;
                            font-weight: bolder;
                            font-size: .46rem;
                            .specification{
                                padding: 0.1rem 0.3rem;
                                background: #ffe200;
                                color: black;
                                font-weight: lighter;
                                border-radius: 1.1rem;
                                position: absolute;
                                right: 0;
                                top: -.266667rem;
                            }
                            div{
                                position: absolute;
                                right: 0;
                                top: -.266667rem;
                            }
                        }
                        
                    }
                }
            }
        }
    }
    .stopScroll{
        /* pointer-events: none; */
    }
    .shoppingCart{
        width: 100%;
        position: fixed;
        z-index: 2;
        bottom: 0;
        height: 1.333333rem;
        background: rgba(0, 0, 0, 0.9);
        .car{
            display: inline-block;
            position: relative;
            height: 100%;
            .carWrap{
                position: absolute;
                width: 1.433333rem;
                height: 1.433333rem;
                border-radius: 50%;
                background: #656565;
                top: -0.35rem;
                left: .266667rem;
                .icon{
                    width: 0.9rem;
                    height:2.7rem;
                    position: absolute;
                    top:-.64rem;
                    left:.213333rem
                }
            }
            .carActive{
                animation: car .2s linear;
            }
            @keyframes car{
                50%{
                    transform: scale(1.25);
                }
                100%{
                    transform: scale(1);
                }
            }
        }
        .totalAmount{
            display:inline-block;
            vertical-align: top;
            margin-left: 2rem;
            margin-top: 0.033333rem;
            .foodPrice{
                color: white;
                font-size: 0.6rem;
            }
            .tip{
                color: gray;
            }
        }
        .shippingFee{
            display: inline-block;
            vertical-align: bottom;
            margin-left: 2rem;
            margin-top: 0.433333rem;
            font-size: 0.366667rem;
            color: gray;
        }
        .buy{
            float: right;
            height: 100%;
            width: 2.933333rem;
            text-align: center;
            font-size: .426667rem;
            padding-top: .346667rem;
            color: gray;
            
        }
    }
    .ball{
        position: fixed;
        bottom: 1.4rem;
        left: 0.9rem;
        z-index: 4;
        transition: transform .6s linear;
        .y{
            width: .333333rem;
            height: .333333rem;
            border-radius: 50%;
            background: red;
            transition: transform .6s cubic-bezier(0.12,-0.31, 0.56,-0.32);
        }
    }
    
}
</style>