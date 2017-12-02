<template>
    <div class="orderDishes">
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
                                        :name="food.name"
                                    ></addToCar>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="telescopic">
            <specification 
                :seller="merchantInfo.poi_info.id"
                :food="specificationContent"
                @ball="ball" 
                @close="closeSpecification"
                v-if="specificationShow">
            </specification>
        </transition>
        <carDetail 
            v-if="carDetailFlag"
            :seller="merchantInfo.poi_info.id"
        ></carDetail>
        <div class="shoppingCart">
            <div class="car" @click="carDetailFlag = !carDetailFlag">
                <div class="carWrap" :class="{carActive:carTransitionOpen,yellowCarWrap:total>0}" ref='carWrap'>
                    <svg class="icon" aria-hidden="true" v-show="total == 0">
                        <use xlink:href="#icon-gouwuche"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" v-show="total > 0">
                        <use xlink:href="#icon-gouwuche-copy"></use>
                    </svg>                
                </div>
            </div>
            <div class="totalAmount">
                <div class="foodPrice">￥{{total}}</div>
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
import carDetail from "../components/carDetail.vue"
import { CARINIT } from "../store/mutations-type.js"
export default {
    name:"orderDishes",
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
            //购物车详情显示标志
            carDetailFlag:false,
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
            foodCount:"foodCount",
            totalPrice:'totalPrice',
        }),
        total(){
            let seller = this.merchantInfo.poi_info.id;
            let index = this.sellerID[seller];
            return this.totalPrice[index];
        }
    },
    components:{
        specification,
        addToCar,
        carDetail
    },
    created(){
        this.merchantInfo = merchantInfo.data;
        this.$store.commit(CARINIT,this.merchantInfo.poi_info.id);

        let food_spu_tags = this.merchantInfo.food_spu_tags;
        let seller = this.merchantInfo.poi_info.id;
        let food = this.sellerID[seller];
        
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
.orderDishes{
    height: calc( 100% - 6.37333rem );
    .shelves{
        display: flex;
        height: 100%;
        /* height: calc( 100% - 6.37333rem ); */
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
    .telescopic-enter-active, .telescopic-leave-active {
        transition: all .5s;
        transform:scale(1);
    }
    .telescopic-enter, .telescopic-leave-to{
        opacity: 0;
        transform:scale(0);
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
            .yellowCarWrap{
                background: #ffe200;
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


